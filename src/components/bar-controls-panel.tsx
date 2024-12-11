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
              <Label className="text-sm text-zinc-400">Smoothing</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.smoothing}
                  onChange={(e) =>
                    updateSetting("smoothing", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                  step="0.1"
                  min="0"
                  max="1"
                />
                <Slider
                  value={[settings.smoothing * 100]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) =>
                    updateSetting("smoothing", value / 100)
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
                  min="1"
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
              <Label className="text-sm text-zinc-400">Bar Spacing</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={settings.barSpacing}
                  onChange={(e) =>
                    updateSetting("barSpacing", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                  disabled={settings.isBarSpacingAuto}
                  min="0"
                />
                <Switch
                  checked={settings.isBarSpacingAuto}
                  onCheckedChange={(checked) =>
                    updateSetting("isBarSpacingAuto", checked)
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

            <div>
              <Label className="text-sm text-zinc-400">Position X</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.x}
                  onChange={(e) => updateSetting("x", Number(e.target.value))}
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  value={[settings.x]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([value]) => updateSetting("x", value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-zinc-400">Position Y</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.y}
                  onChange={(e) => updateSetting("y", Number(e.target.value))}
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  value={[settings.y]}
                  min={-400}
                  max={400}
                  step={1}
                  onValueChange={([value]) => updateSetting("y", value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-zinc-400">
                Rotation (degrees)
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.rotation}
                  onChange={(e) =>
                    updateSetting("rotation", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  value={[settings.rotation]}
                  min={-180}
                  max={180}
                  step={1}
                  onValueChange={([value]) => updateSetting("rotation", value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm text-zinc-400">Opacity (%)</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.opacity}
                  onChange={(e) =>
                    updateSetting("opacity", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                  min="0"
                  max="100"
                />
                <Slider
                  value={[settings.opacity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => updateSetting("opacity", value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
