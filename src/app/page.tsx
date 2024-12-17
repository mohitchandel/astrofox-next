"use client";

import * as React from "react";
import { Timeline } from "@/components/timeline";
import { TextControlsPanel } from "@/components/control-panel/text-controls-panel";
import { BarControlsPanel } from "@/components/control-panel/bar-controls-panel";
import { ImageControlsPanel } from "@/components/control-panel/image-controls-panel";
import { JSX } from "react";
import { BarSpectrumSettings } from "@/types/bar-spectrum";
import WaveSurferVisualizer from "@/components/wave-surfer";
import { WaveControlsPanel } from "@/components/control-panel/wave-controls-panel";
import { WaveSettings } from "@/types/wave-settings";
import { AudioControlsPanel } from "@/components/control-panel/audio-controls-panel";
import { LayersPanel } from "@/components/control-panel/layer-panel";
import AudioVisualizer from "@/components/visualizer/audio-visualizer";
import SoundWaveVisualizer from "@/components/visualizer/sound-wave-visualizer";

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
  const [audioElement, setAudioElement] =
    React.useState<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = React.useState<string>("/path-to-audio.mp3");
  const [sceneDimensions, setSceneDimensions] = React.useState({
    width: 854,
    height: 480,
  });

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

  const [barSpectrumSettings, setBarSpectrumSettings] =
    React.useState<BarSpectrumSettings>({
      maxDb: -20,
      minFrequency: 20,
      maxFrequency: 20000,
      smoothing: 0.8,
      width: 800,
      height: 200,
      shadowHeight: 50,
      barWidth: 15,
      isBarWidthAuto: true,
      barSpacing: 5,
      isBarSpacingAuto: true,
      barColor: "#00ff00",
      shadowColor: "#003300",
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 100,
    });

  const [waveSettings, setWaveSettings] = React.useState<WaveSettings>({
    lineWidth: 1,
    wavelength: 0,
    smoothing: 0,
    stroke: true,
    strokeColor: "#FFFFFF",
    fill: false,
    fillColor: "#FFFFFF",
    taperEdges: false,
    width: 854,
    height: 240,
    x: 0,
    y: 0,
    rotation: 0,
  });

  const handleTextChange = React.useCallback((newTextStyle: TextStyle) => {
    setTextStyle(newTextStyle);
  }, []);

  const handleAudioElementCreated = React.useCallback(
    (element: HTMLAudioElement) => {
      setAudioElement(element);
      setAudioUrl(element.src || "/path-to-audio.mp3");
    },
    []
  );

  const handleDimensionsChange = (newDimensions: {
    width: number;
    height: number;
  }) => {
    setSceneDimensions(newDimensions);
  };

  return (
    <div className="h-screen bg-zinc-700 text-zinc-100 flex flex-col overflow-hidden shadow-lg">
      <div className="flex flex-1 min-h-0 justify-between">
        <div className="flex flex-col h-full w-full items-center justify-center">
          <div className="flex-1 p-4 flex items-center justify-center">
            <div
              className="bg-black relative flex items-center justify-center"
              style={{
                width: `${sceneDimensions.width}px`,
                height: `${sceneDimensions.height}px`,
              }}
            >
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

              <AudioVisualizer
                audioElement={audioElement}
                settings={barSpectrumSettings}
              />

              <SoundWaveVisualizer
                audioElement={audioElement}
                settings={waveSettings}
              />
            </div>
          </div>
          <div className="flex flex-col p-4 w-1/2 bg-transparent mx-auto">
            {audioUrl && <WaveSurferVisualizer audioElement={audioElement} />}
          </div>
        </div>
        {/* Scene end*/}

        <div className="w-80 bg-zinc-900 border-l border-zinc-800 flex flex-col">
          <div className="flex-none">
            <LayersPanel />
          </div>
          <div className="flex-1 overflow-y-auto">
            <TextControlsPanel onTextChange={handleTextChange} />
            <AudioControlsPanel
              onAudioElementCreated={handleAudioElementCreated}
            />
            <BarControlsPanel onSettingsChange={setBarSpectrumSettings} />
            <WaveControlsPanel onSettingsChange={setWaveSettings} />
            <ImageControlsPanel />
          </div>
        </div>
      </div>

      <Timeline
        audioElement={audioElement}
        dimensions={sceneDimensions}
        onDimensionsChange={handleDimensionsChange}
      />
    </div>
  );
}
