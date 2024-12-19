"use client";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  defaultWaveSpectrumSettings,
  WaveSpectrumSettings,
} from "@/types/wave-spectrum";
import { WaveSpectrumControlsPanelProps } from "@/types/control-panels";

export function WaveSpectrumControlsPanel({
  settings: initialSettings,
  onSettingsChange,
  layerNumber,
}: WaveSpectrumControlsPanelProps) {
  const [settings, setSettings] = useState<WaveSpectrumSettings>(
    initialSettings || defaultWaveSpectrumSettings
  );

  useEffect(() => {
    if (initialSettings) {
      setSettings(initialSettings);
    }
  }, [initialSettings]);

  const updateSetting = <K extends keyof WaveSpectrumSettings>(
    key: K,
    value: WaveSpectrumSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="bg-[#2c2c2c] p-4 mt-2">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-xs font-medium">Wave Spectrum</h3>
            <span className="text-xs text-zinc-400">
              {`Wave Spectrum ${layerNumber}`}
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">MaxDB</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.maxDb}
                  onChange={(e) =>
                    updateSetting("maxDb", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.maxDb]}
                  min={-100}
                  max={0}
                  step={1}
                  onValueChange={([value]) => updateSetting("maxDb", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Min Frequency</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.minFrequency}
                  onChange={(e) =>
                    updateSetting("minFrequency", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.minFrequency]}
                  min={0}
                  max={4630}
                  step={1}
                  onValueChange={([value]) =>
                    updateSetting("minFrequency", value)
                  }
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Max Frequency</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.maxFrequency}
                  onChange={(e) =>
                    updateSetting("maxFrequency", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.maxFrequency]}
                  min={0}
                  max={22000}
                  step={1}
                  onValueChange={([value]) =>
                    updateSetting("maxFrequency", value)
                  }
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Smoothing</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.smoothing}
                  onChange={(e) =>
                    updateSetting("smoothing", Number(e.target.value))
                  }
                  step="0.1"
                  min="0"
                  max="1"
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.smoothing]}
                  min={0}
                  max={1}
                  step={0.1}
                  onValueChange={([value]) => updateSetting("smoothing", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Height</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.height}
                  onChange={(e) =>
                    updateSetting("height", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.height]}
                  min={0}
                  max={480}
                  step={1}
                  onValueChange={([value]) => updateSetting("height", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Width</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.width}
                  onChange={(e) =>
                    updateSetting("width", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.width]}
                  min={0}
                  max={480}
                  step={1}
                  onValueChange={([value]) => updateSetting("width", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <Label className="text-zinc-400 text-xs">Stroke</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.stroke}
                  onCheckedChange={(checked) =>
                    updateSetting("stroke", checked)
                  }
                  className="data-[state=unchecked]:bg-[#1a1a1a]"
                />
                <span className="text-zinc-400">Auto</span>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Stroke Color</label>
              <div className="flex items-center gap-2 mt-1 col-span-2 rounded-full justify-center">
                <Input
                  type="color"
                  value={settings.strokeColor}
                  onChange={(e) => updateSetting("strokeColor", e.target.value)}
                  className="w-8 h-8 p-1 rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Fill Color</label>
              <div className="flex items-center gap-2 mt-1 col-span-2 rounded-full justify-center">
                <Input
                  type="color"
                  value={settings.fillColor}
                  onChange={(e) => updateSetting("fillColor", e.target.value)}
                  className="w-8 h-8 p-1 rounded-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <Label className="text-zinc-400 text-xs">Taper Edges</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.taperEdges}
                  onCheckedChange={(checked) =>
                    updateSetting("taperEdges", checked)
                  }
                  className="data-[state=unchecked]:bg-[#1a1a1a]"
                />
                <span className="text-zinc-400">Auto</span>
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">X</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.x}
                  onChange={(e) => updateSetting("x", Number(e.target.value))}
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.x]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([value]) => updateSetting("x", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Y</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.y}
                  onChange={(e) => updateSetting("y", Number(e.target.value))}
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.y]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([value]) => updateSetting("y", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Rotation</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.rotation}
                  onChange={(e) =>
                    updateSetting("rotation", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.rotation]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([value]) => updateSetting("rotation", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Opacity</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.opacity}
                  onChange={(e) =>
                    updateSetting("opacity", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.opacity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => updateSetting("opacity", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
