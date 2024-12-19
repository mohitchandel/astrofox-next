"use client";

import * as React from "react";
import { Timeline } from "@/components/timeline";
import { TextControlsPanel } from "@/components/control-panel/text-controls-panel";
import { BarControlsPanel } from "@/components/control-panel/bar-controls-panel";
import { ImageControlsPanel } from "@/components/control-panel/image-controls-panel";
import { WaveControlsPanel } from "@/components/control-panel/wave-controls-panel";
import { WaveSpectrumControlsPanel } from "@/components/control-panel/wave-spectrum-controls-panel";
import { LayersPanel } from "@/components/control-panel/layer-panel";
import WaveVisualizer from "@/components/visualizer/sound-wave-visualizer";
import BarSpectrumVisualizer from "@/components/visualizer/bar-spectrum-visualizer";
import WaveSpectrumVisualizer from "@/components/visualizer/wave-spectrum-visualizer";
import WaveSurferVisualizer from "@/components/wave-surfer";
import Navbar from "@/components/navbar";
import { useLayerContext } from "@/context/LayerContext";
import { TextStyle } from "@/types/text-style";
import { BarSpectrumSettings } from "@/types/bar-spectrum";
import { WaveSettings } from "@/types/wave-settings";
import { WaveSpectrumSettings } from "@/types/wave-spectrum";
import { ImageSettings } from "@/types/image-setting";

// Type definitions
interface SceneDimensions {
  width: number;
  height: number;
}

interface LayerSettings {
  text: TextStyle;
  barSpectrum: BarSpectrumSettings;
  wave: WaveSettings;
  waveSpectrum: WaveSpectrumSettings;
  image: ImageSettings;
}

export default function Home() {
  // State for scene dimensions
  const [sceneDimensions, setSceneDimensions] = React.useState<SceneDimensions>(
    {
      width: 854,
      height: 480,
    }
  );

  const { layers, activeLayerId, updateLayer } = useLayerContext();

  const activeLayer = layers.find((layer) => layer.id === activeLayerId);

  const barSpectrumLayers = layers.filter(
    (layer) => layer.type === "barSpectrum"
  );
  const TextLayers = layers.filter((layer) => layer.type === "text");
  const waveSpectrumLayers = layers.filter(
    (layer) => layer.type === "waveSpectrum"
  );
  const waveLayers = layers.filter((layer) => layer.type === "wave");
  const imageLayers = layers.filter((layer) => layer.type === "image");

  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  const getScaledSize = (baseSize: number, zoom: number) => {
    return (baseSize * zoom) / 100;
  };

  // Handle scene dimensions change
  const handleDimensionsChange = (newDimensions: SceneDimensions) => {
    setSceneDimensions(newDimensions);
  };

  // Type-safe handler for updating layer settings
  const handleLayerSettingsChange = <T extends keyof LayerSettings>(
    layerId: string,
    layerType: T,
    newSettings: LayerSettings[T]
  ) => {
    updateLayer(layerId, { settings: newSettings });
  };

  // Render individual layer
  const renderLayer = (layer: any) => {
    if (!layer.visible) return null;

    switch (layer.type) {
      case "text":
        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              zIndex: layer.zIndex,
              fontFamily: layer.settings.font,
              fontSize: `${layer.settings.size}px`,
              fontStyle: layer.settings.isItalic ? "italic" : "normal",
              fontWeight: layer.settings.isBold ? "bold" : "normal",
              transform: `translate(${layer.settings.x}px, ${layer.settings.y}px) rotate(${layer.settings.rotation}deg)`,
              color: layer.settings.color,
              opacity: layer.settings.opacity / 100,
            }}
          >
            {layer.settings.text}
          </div>
        );

      case "image":
        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              zIndex: layer.zIndex,
              transform: `rotate(${layer.settings.rotation}deg)`,
              backgroundImage: `url(${layer.settings.url})`,
              backgroundSize: `${getScaledSize(
                layer.settings.width,
                layer.settings.zoom
              )}% ${getScaledSize(
                layer.settings.height,
                layer.settings.zoom
              )}%`,
              backgroundPosition: `calc(50% + ${layer.settings.x}px) calc(50% + ${layer.settings.y}px)`,
              backgroundRepeat: "no-repeat",
              opacity: layer.settings.opacity / 100,
              inset: 0,
            }}
          />
        );

      case "barSpectrum":
        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              zIndex: layer.zIndex,
              transform: `translate(${layer.settings.x}px, ${layer.settings.y}px)`,
              opacity: layer.settings.opacity / 100,
            }}
          >
            <BarSpectrumVisualizer
              barCount={64}
              barSpectrumSettings={layer.settings}
            />
          </div>
        );

      case "wave":
        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              zIndex: layer.zIndex,
              transform: `translate(${layer.settings.x}px, ${layer.settings.y}px)`,
              opacity: layer.settings.opacity / 100,
            }}
          >
            <WaveVisualizer waveSettings={layer.settings} />
          </div>
        );

      case "waveSpectrum":
        return (
          <div
            key={layer.id}
            style={{
              position: "absolute",
              zIndex: layer.zIndex,
              transform: `translate(${layer.settings.x}px, ${layer.settings.y}px)`,
              opacity: layer.settings.opacity / 100,
            }}
          >
            <WaveSpectrumVisualizer waveSpectrumSettings={layer.settings} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen bg-[#202020] text-zinc-100 flex flex-col overflow-hidden shadow-lg">
      <Navbar />
      <div className="flex flex-1 min-h-0 justify-between">
        <div className="flex flex-col h-full w-full items-center justify-center">
          <div className="flex-1 p-4 relative">
            <div
              className="bg-black relative flex items-center justify-center shadow-lg shadow-black overflow-hidden"
              style={{
                width: `${sceneDimensions.width}px`,
                height: `${sceneDimensions.height}px`,
              }}
            >
              {sortedLayers.map((layer) => renderLayer(layer))}
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
            {activeLayer && (
              <>
                {activeLayer.type === "text" &&
                  TextLayers.map((layer) => (
                    <TextControlsPanel
                      key={layer.id}
                      settings={layer.settings as TextStyle}
                      onSettingsChange={(newSettings: TextStyle) =>
                        handleLayerSettingsChange(layer.id, "text", newSettings)
                      }
                      layerNumber={TextLayers.indexOf(layer) + 1}
                    />
                  ))}
                {activeLayer.type === "barSpectrum" &&
                  barSpectrumLayers.map((layer) => (
                    <BarControlsPanel
                      key={layer.id}
                      settings={layer.settings as BarSpectrumSettings}
                      onSettingsChange={(newSettings) =>
                        handleLayerSettingsChange(
                          layer.id,
                          "barSpectrum",
                          newSettings
                        )
                      }
                      layerNumber={barSpectrumLayers.indexOf(layer) + 1}
                    />
                  ))}

                {activeLayer.type === "wave" &&
                  waveLayers.map((layer) => (
                    <WaveControlsPanel
                      key={layer.id}
                      settings={layer.settings as WaveSettings}
                      onSettingsChange={(newSettings) =>
                        handleLayerSettingsChange(layer.id, "wave", newSettings)
                      }
                      layerNumber={waveLayers.indexOf(layer) + 1}
                    />
                  ))}

                {activeLayer.type === "waveSpectrum" &&
                  waveSpectrumLayers.map((layer) => (
                    <WaveSpectrumControlsPanel
                      key={layer.id}
                      settings={layer.settings as WaveSpectrumSettings}
                      onSettingsChange={(newSettings) =>
                        handleLayerSettingsChange(
                          layer.id,
                          "waveSpectrum",
                          newSettings
                        )
                      }
                      layerNumber={waveSpectrumLayers.indexOf(layer) + 1}
                    />
                  ))}
                {activeLayer.type === "image" &&
                  imageLayers.map((layer) => (
                    <ImageControlsPanel
                      key={layer.id}
                      settings={layer.settings as ImageSettings}
                      onSettingsChange={(newSettings) =>
                        handleLayerSettingsChange(
                          layer.id,
                          "image",
                          newSettings
                        )
                      }
                      layerNumber={imageLayers.indexOf(layer) + 1}
                    />
                  ))}
              </>
            )}
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
