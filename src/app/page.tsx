"use client";

import * as React from "react";
import { LayersPanel } from "@/components/layer-panel";
import { Timeline } from "@/components/timeline";
import { TextControlsPanel } from "@/components/text-controls-panel";
import { BarControlsPanel } from "@/components/bar-controls-panel";
import { ImageControlsPanel } from "@/components/image-controls-panel";
import { AudioControlsPanel } from "@/components/audio-controls-panel";
import { JSX } from "react";

interface TextStyle {
  text: string;
  size: number;
  font: string;
  isItalic: boolean;
  isBold: boolean;
  x: number;
  y: number;
  color: string;
  rotation: number;
  opacity: number;
}

export default function Home(): JSX.Element {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [currentTime, setCurrentTime] = React.useState<number>(0);
  const [duration] = React.useState<number>(60);
  const [textStyle, setTextStyle] = React.useState<TextStyle>({
    text: "hello",
    size: 40,
    font: "roboto",
    isItalic: false,
    isBold: false,
    x: 0,
    y: 0,
    color: "#FFFFFF",
    rotation: 0,
    opacity: 100,
  });

  const handleTextChange = React.useCallback((newTextStyle: TextStyle) => {
    setTextStyle(newTextStyle);
  }, []);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      <div className="flex flex-1 min-h-0">
        <div className="flex-1 p-4 flex items-center justify-center bg-black">
          <div
            style={{
              fontFamily: textStyle.font,
              fontSize: `${textStyle.size}px`,
              fontStyle: textStyle.isItalic ? "italic" : "normal",
              fontWeight: textStyle.isBold ? "bold" : "normal",
              transform: `translate(${textStyle.x}px, ${textStyle.y}px) rotate(${textStyle.rotation}deg)`,
              color: textStyle.color,
              opacity: textStyle.opacity / 100,
            }}
          >
            {textStyle.text}
          </div>
        </div>

        <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
          <div className="flex-none">
            <LayersPanel />
          </div>
          <div className="flex-1 overflow-y-auto">
            <TextControlsPanel onTextChange={handleTextChange} />
            <BarControlsPanel />
            <ImageControlsPanel />
            <AudioControlsPanel />
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
