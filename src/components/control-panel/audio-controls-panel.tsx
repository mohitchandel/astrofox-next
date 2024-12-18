import { Input } from "@/components/ui/input";
import { useAudioElement } from "@/context/AudioContext";
import { useState, useEffect, useRef, JSX } from "react";

interface AudioControlsPanelProps {
  onAudioElementCreated: (audioElement: HTMLAudioElement) => void;
}

export function AudioControlsPanel(): JSX.Element {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { audioElement, createAudioElement } = useAudioElement();

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setFileName(file.name);
    }
  };

  useEffect(() => {
    if (audioSrc && !audioElement) {
      // Create a new audio element only if it's not created yet
      createAudioElement(audioSrc);
    }
  }, [audioSrc, audioElement, createAudioElement]); // Only run when audioSrc or audioElement changes

  useEffect(() => {
    return () => {
      if (audioSrc) {
        URL.revokeObjectURL(audioSrc);
      }
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="border-t border-zinc-800 bg-[#1E1E1E] p-4">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium">Audio</h3>
            <span className="text-xs text-zinc-400">Audio 1</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Upload Audio</label>
              <Input
                type="file"
                accept="audio/*"
                onChange={handleAudioUpload}
                className="mt-1 bg-zinc-900"
              />
              {fileName && (
                <p className="mt-2 text-sm text-zinc-400">
                  Selected: {fileName}
                </p>
              )}
            </div>
            {audioSrc && (
              <div className="space-y-2">
                <audio
                  ref={audioRef}
                  id="audioPlayer"
                  src={audioSrc}
                  className="w-full"
                  onEnded={() => setIsPlaying(false)}
                />
                <button
                  onClick={togglePlay}
                  className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
