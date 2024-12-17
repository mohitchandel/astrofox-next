import React from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WaveSettings {
  lineWidth: number;
  wavelength: number;
  smoothing: number;
  stroke: boolean;
  strokeColor: string;
  fill: boolean;
  fillColor: string;
  taperEdges: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
}

interface WaveControlsPanelProps {
  onSettingsChange: (settings: WaveSettings) => void;
}

export function WaveControlsPanel({
  onSettingsChange,
}: WaveControlsPanelProps) {
  const [settings, setSettings] = React.useState<WaveSettings>({
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
    <div className="border-t bg-[#1E1E1E] p-4">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium">Sound Wave</h3>
          </div>

          <div className="space-y-4">
            {/* Line Width */}
            <div>
              <Label className="text-sm text-zinc-400">Line Width</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.lineWidth}
                  onChange={(e) =>
                    updateSetting("lineWidth", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                  min="1"
                />
                <Slider
                  value={[settings.lineWidth]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={([value]) => updateSetting("lineWidth", value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Wavelength */}
            <div>
              <Label className="text-sm text-zinc-400">Wavelength</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={settings.wavelength}
                  onChange={(e) =>
                    updateSetting("wavelength", Number(e.target.value))
                  }
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  value={[settings.wavelength]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) =>
                    updateSetting("wavelength", value)
                  }
                  className="flex-1"
                />
              </div>
            </div>

            {/* Smoothing */}
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
                />
                <Slider
                  value={[settings.smoothing]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => updateSetting("smoothing", value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Stroke Toggle & Color */}
            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Stroke</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.stroke}
                  onCheckedChange={(checked) =>
                    updateSetting("stroke", checked)
                  }
                />
                <Input
                  type="color"
                  value={settings.strokeColor}
                  onChange={(e) => updateSetting("strokeColor", e.target.value)}
                  className="w-16 h-8 bg-zinc-900"
                  disabled={!settings.stroke}
                />
              </div>
            </div>

            {/* Fill Toggle & Color */}
            <div className="flex items-center justify-between">
              <Label className="text-sm text-zinc-400">Fill</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={settings.fill}
                  onCheckedChange={(checked) => updateSetting("fill", checked)}
                />
                <Input
                  type="color"
                  value={settings.fillColor}
                  onChange={(e) => updateSetting("fillColor", e.target.value)}
                  className="w-16 h-8 bg-zinc-900"
                  disabled={!settings.fill}
                />
              </div>
            </div>

            {/* Position Controls */}
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
              <Label className="text-sm text-zinc-400">Rotation</Label>
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
          </div>
        </div>
      </div>
    </div>
  );
}
