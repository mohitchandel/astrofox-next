import { Input } from "@/components/ui/input";
import { useAudioElement } from "@/context/AudioContext";
import { useState, useEffect, useRef, JSX } from "react";
import { Label } from "./ui/label";

export default function Navbar() {
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
    <div className="h-18 bg-zinc-900 border-t border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-end gap-4 h-10">
        {fileName ? (
          <p className="text-sm text-zinc-400">Selected: {fileName}</p>
        ) : (
          <Label>Upload Audio</Label>
        )}
        <Input
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          className="bg-primary w-64 h-8 rounded-md text-white cursor-pointer transition duration-200 ease-in-out"
          aria-label="Upload audio"
        />
      </div>
    </div>
  );
}
