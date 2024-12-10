"use client";

import * as React from "react";
import { LayersPanel } from "@/components/layer-panel";
import { Timeline } from "@/components/timeline";
import { TextControlsPanel } from "@/components/text-controls-panel";
import { BarControlsPanel } from "@/components/bar-controls-panel";
import { ImageControlsPanel } from "@/components/image-controls-panel";

export default function Home() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration] = React.useState(60);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-4 flex items-center justify-center bg-black">
          <div className="text-white text-4xl font-normal">hello</div>
        </div>

        <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
          <div className="flex-none">
            <LayersPanel />
          </div>
          <div className="flex-1 overflow-y-auto">
            <TextControlsPanel />
            <BarControlsPanel />
            <ImageControlsPanel />
          </div>
        </div>
      </div>

      <Timeline
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        duration={duration}
      />
    </div>
  );
}
