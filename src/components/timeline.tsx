import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Volume2, RotateCcw } from "lucide-react";
import { useAudioControls } from "@/hooks/useAudioControls";

interface TimelineProps {
  audioElement: HTMLAudioElement | null;
  dimensions: {
    width: number;
    height: number;
  };
  onDimensionsChange: (dimensions: { width: number; height: number }) => void;
}

export function Timeline({
  audioElement,
  dimensions,
  onDimensionsChange,
}: TimelineProps) {
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

  const [zoomLevel, setZoomLevel] = React.useState(76); // Initialize zoom level (percentage)

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 100)); // Increase zoom, max 100%
    adjustDimensions(Math.min(zoomLevel + 10, 100));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 0)); // Decrease zoom, min 0%
    adjustDimensions(Math.max(zoomLevel - 10, 0));
  };

  const handleSliderChange = (value: number) => {
    setZoomLevel(value);
    adjustDimensions(value);
  };

  const adjustDimensions = (zoom: number) => {
    const baseWidth = 1280; // Default width for 100% zoom
    const baseHeight = 720; // Default height for 100% zoom
    const width = Math.max((baseWidth * zoom) / 100, 320); // Ensure minimum dimensions
    const height = Math.max((baseHeight * zoom) / 100, 240);
    onDimensionsChange({ width, height });
  };

  return (
    <>
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
      <div className="h-8 bg-[#7E57C2] flex items-center justify-between px-4">
        <div className="flex-1 flex items-center justify-center gap-3">
          <span className="text-white text-sm">{`${Math.round(
            dimensions.width
          )} x ${Math.round(dimensions.height)}`}</span>
          <button
            onClick={handleZoomOut}
            className="text-white w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
          >
            -
          </button>
          <Slider
            value={[zoomLevel]}
            max={100}
            step={1}
            className="w-32"
            onValueChange={([value]) => handleSliderChange(value)}
          />
          <button
            onClick={handleZoomIn}
            className="text-white w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded"
          >
            +
          </button>
          <span className="text-white text-sm">{zoomLevel}%</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white">
          <span>23.53 MB</span>
          <span>60 FPS</span>
          <span>1.4.0</span>
        </div>
      </div>
    </>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
