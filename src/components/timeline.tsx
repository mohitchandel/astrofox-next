import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Volume2, RotateCcw } from "lucide-react";
import { useAudioControls } from "@/hooks/useAudioControls";

interface TimelineProps {
  audioElement: HTMLAudioElement | null;
}

export function Timeline({ audioElement }: TimelineProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seekTo,
    setVolumeLevel,
    restart,
  } = useAudioControls(audioElement);

  return (
    <div className="h-20 bg-zinc-900 border-t border-zinc-800 p-4 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-zinc-400" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="w-24"
            onValueChange={([value]) => setVolumeLevel(value)}
          />
        </div>
        <div className="flex-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={([value]) => seekTo(value)}
          />
        </div>
        <div className="text-sm text-zinc-400">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
          onClick={restart}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
