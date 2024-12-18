"use client";

import * as React from "react";
import { Timeline } from "@/components/timeline";
import { TextControlsPanel } from "@/components/control-panel/text-controls-panel";
import { BarControlsPanel } from "@/components/control-panel/bar-controls-panel";
import { ImageControlsPanel } from "@/components/control-panel/image-controls-panel";
import { JSX } from "react";
import {
  BarSpectrumSettings,
  defaultBarSpectrumSettings,
} from "@/types/bar-spectrum";
import WaveSurferVisualizer from "@/components/wave-surfer";
import { WaveControlsPanel } from "@/components/control-panel/wave-controls-panel";
import { defaultWaveSettings, WaveSettings } from "@/types/wave-settings";
import { AudioControlsPanel } from "@/components/control-panel/audio-controls-panel";
import { LayersPanel } from "@/components/control-panel/layer-panel";
import WaveVisualizer from "@/components/visualizer/sound-wave-visualizer";
import { useStateContext } from "@/context/StateContext";
import BarSpectrumVisualizer from "@/components/visualizer/bar-spectrum-visualizer";
import { TextStyle } from "@/types/text-style";
import {
  defaultWaveSpectrumSettings,
  WaveSpectrumSettings,
} from "@/types/wave-spectrum";
import { WaveSpectrumControlsPanel } from "@/components/control-panel/wave-spectrum-controls-panel";
import WaveSpectrumVisualizer from "@/components/visualizer/wave-spectrum-visualizer";

export default function Home(): JSX.Element {
  const [sceneDimensions, setSceneDimensions] = React.useState({
    width: 854,
    height: 480,
  });
  const { openText, openBarSpectrum, openWave, openWaveSpectrum } =
    useStateContext();

  const [textStyle, setTextStyle] = React.useState<TextStyle>({
    text: "",
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
    React.useState<BarSpectrumSettings>(defaultBarSpectrumSettings);

  const [waveSettings, setWaveSettings] =
    React.useState<WaveSettings>(defaultWaveSettings);

  const [waveSpectrumSettings, setWaveSpectrumSettings] =
    React.useState<WaveSpectrumSettings>(defaultWaveSpectrumSettings);

  const handleTextChange = React.useCallback((newTextStyle: TextStyle) => {
    setTextStyle(newTextStyle);
  }, []);

  const handleDimensionsChange = (newDimensions: {
    width: number;
    height: number;
  }) => {
    setSceneDimensions(newDimensions);
  };

  return (
    <div className="h-screen bg-[#202020] text-zinc-100 flex flex-col overflow-hidden shadow-lg">
      <div className="flex flex-1 min-h-0 justify-between">
        <div className="flex flex-col h-full w-full items-center justify-center">
          <div className="flex-1 p-4 ">
            <div
              className="bg-black relative flex items-center justify-center shadow-lg shadow-black"
              style={{
                width: `${sceneDimensions.width}px`,
                height: `${sceneDimensions.height}px`,
              }}
            >
              <div className="absolute">
                {openText && (
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
                )}
              </div>

              <div className="absolute">
                {openBarSpectrum && (
                  <BarSpectrumVisualizer
                    barCount={64}
                    barSpectrumSettings={barSpectrumSettings}
                  />
                )}
              </div>

              <div className="absolute">
                {openWave && <WaveVisualizer waveSettings={waveSettings} />}
              </div>

              <div className="absolute">
                {openWaveSpectrum && (
                  <WaveSpectrumVisualizer
                    waveSpectrumSettings={waveSpectrumSettings}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4 w-1/2 bg-transparent mx-auto">
            <WaveSurferVisualizer />
          </div>
        </div>

        <div className="w-80 bg-[#2c2c2c] shadow-2xl flex flex-col">
          <div className="flex-none">
            <LayersPanel />
          </div>

          <div className="flex-1 overflow-y-auto bg-[#1e1e1e]">
            <div className="text-xs py-4 px-4">CONTROLS</div>
            <TextControlsPanel onTextChange={handleTextChange} />
            <AudioControlsPanel />
            <BarControlsPanel onSettingsChange={setBarSpectrumSettings} />
            <WaveControlsPanel onSettingsChange={setWaveSettings} />
            <WaveSpectrumControlsPanel
              onSettingsChange={setWaveSpectrumSettings}
            />
            <ImageControlsPanel />
          </div>
        </div>
      </div>

      <Timeline
        dimensions={sceneDimensions}
        onDimensionsChange={handleDimensionsChange}
      />
    </div>
  );
}
