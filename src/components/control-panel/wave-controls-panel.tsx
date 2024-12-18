import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultWaveSettings, WaveSettings } from "@/types/wave-settings";

interface WaveControlsPanelProps {
  onSettingsChange: (settings: WaveSettings) => void;
}

export function WaveControlsPanel({
  onSettingsChange,
}: WaveControlsPanelProps) {
  const [settings, setSettings] =
    React.useState<WaveSettings>(defaultWaveSettings);

  React.useEffect(() => {
    onSettingsChange(settings);
  }, [settings, onSettingsChange]);

  const updateSetting = <K extends keyof WaveSettings>(
    key: K,
    value: WaveSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-[#2c2c2c] p-4 mt-2">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-xs font-medium">Sound Wave</h3>
            <span className="text-xs text-zinc-400">Sound Wave 1</span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Line Width</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.lineWidth}
                  onChange={(e) =>
                    updateSetting("lineWidth", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.lineWidth]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={([value]) => updateSetting("lineWidth", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">Wavelength</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={settings.wavelength}
                  onChange={(e) =>
                    updateSetting("wavelength", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.wavelength]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) =>
                    updateSetting("wavelength", value)
                  }
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
                  max={1000}
                  step={1}
                  onValueChange={([value]) => updateSetting("width", value)}
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
                  max={1000}
                  step={1}
                  onValueChange={([value]) => updateSetting("height", value)}
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
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.smoothing]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => updateSetting("smoothing", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            {/* Stroke Toggle & Color */}
            <div className="grid grid-cols-3 items-center">
              <Label className="text-xs text-zinc-400">Stroke</Label>
              <div className="grid grid-cols-2 items-center gap-2 col-span-2">
                <Switch
                  checked={settings.stroke}
                  onCheckedChange={(checked) =>
                    updateSetting("stroke", checked)
                  }
                  className="data-[state=unchecked]:bg-[#1a1a1a]"
                />
                <Input
                  type="color"
                  value={settings.strokeColor}
                  onChange={(e) => updateSetting("strokeColor", e.target.value)}
                  className="w-8 h-8 p-1 rounded-full"
                  disabled={!settings.stroke}
                />
              </div>
            </div>

            {/* Fill Toggle & Color */}
            <div className="grid grid-cols-3 items-center">
              <Label className="text-xs text-zinc-400">Fill</Label>
              <div className="grid grid-cols-2 items-center gap-2 col-span-2">
                <Switch
                  checked={settings.fill}
                  onCheckedChange={(checked) => updateSetting("fill", checked)}
                  className="data-[state=unchecked]:bg-[#1a1a1a]"
                />
                <Input
                  type="color"
                  value={settings.fillColor}
                  onChange={(e) => updateSetting("fillColor", e.target.value)}
                  className="w-8 h-8 p-1 rounded-full"
                  disabled={!settings.fill}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center">
              <label className="text-zinc-400 text-xs">x</label>
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
                  min={-180}
                  max={180}
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
