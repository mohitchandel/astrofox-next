"use client";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarSpectrumSettings } from "@/types/bar-spectrum";

interface BarControlsPanelProps {
  onSettingsChange: (settings: BarSpectrumSettings) => void;
}

export function BarControlsPanel({ onSettingsChange }: BarControlsPanelProps) {
  const [settings, setSettings] = useState<BarSpectrumSettings>({
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

  useEffect(() => {
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const updateSetting = <K extends keyof BarSpectrumSettings>(
    key: K,
    value: BarSpectrumSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium">Bar Spectrum</h3>
            <span className="text-xs text-zinc-400">Bar Spectrum 1</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm text-zinc-400">MaxDB</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.maxDb}
                  onChange={(e) =>
                    updateSetting("maxDb", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  value={[settings.maxDb]}
                  min={-100}
                  max={0}
                  step={1}
                  onValueChange={([value]) => updateSetting("maxDb", value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-zinc-400">
                Min Frequency (Hz)
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.minFrequency}
                  onChange={(e) =>
                    updateSetting("minFrequency", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  value={[settings.minFrequency]}
                  min={20}
                  max={1000}
                  step={1}
                  onValueChange={([value]) =>
                    updateSetting("minFrequency", value)
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-zinc-400">
                Max Frequency (Hz)
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.maxFrequency}
                  onChange={(e) =>
                    updateSetting("maxFrequency", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  value={[settings.maxFrequency]}
                  min={1000}
                  max={20000}
                  step={100}
                  onValueChange={([value]) =>
                    updateSetting("maxFrequency", value)
                  }
                  className="flex-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Bar Width</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={settings.barWidth}
                  onChange={(e) =>
                    updateSetting("barWidth", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                  disabled={settings.isBarWidthAuto}
                />
                <Switch
                  checked={settings.isBarWidthAuto}
                  onCheckedChange={(checked) =>
                    updateSetting("isBarWidthAuto", checked)
                  }
                />
                <span className="text-sm text-zinc-400">Auto</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Bar Color</Label>
              <Input
                type="color"
                value={settings.barColor}
                onChange={(e) => updateSetting("barColor", e.target.value)}
                className="w-16 h-8 bg-zinc-900"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Shadow Color</Label>
              <Input
                type="color"
                value={settings.shadowColor}
                onChange={(e) => updateSetting("shadowColor", e.target.value)}
                className="w-16 h-8 bg-zinc-900"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">X</Label>
              <Slider
                value={[settings.maxFrequency]}
                min={1000}
                max={20000}
                step={100}
                onValueChange={([value]) => updateSetting("x", value)}
                className="flex-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Y</Label>
              <Slider
                value={[settings.maxFrequency]}
                min={1000}
                max={20000}
                step={100}
                onValueChange={([value]) => updateSetting("y", value)}
                className="flex-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Rotation</Label>
              <Slider
                value={[settings.maxFrequency]}
                min={1000}
                max={20000}
                step={100}
                onValueChange={([value]) => updateSetting("rotation", value)}
                className="flex-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Opacity</Label>
              <Slider
                value={[settings.maxFrequency]}
                min={1000}
                max={20000}
                step={100}
                onValueChange={([value]) => updateSetting("opacity", value)}
                className="flex-1"
              />
            </div>

            {/* Add remaining controls similarly */}
          </div>
        </div>
      </div>
    </div>
  );
}
