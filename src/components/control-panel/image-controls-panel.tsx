import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { defaultImageSettings, ImageSettings } from "@/types/image-setting";

export function ImageControlsPanel({
  onSettingsChange,
}: {
  onSettingsChange: (settings: ImageSettings) => void;
}) {
  const [settings, setSettings] = useState<ImageSettings>(defaultImageSettings);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);

      const img = new Image();
      img.onload = () => {
        const maxDimension = 100; // Max percentage of container
        const aspectRatio = img.naturalWidth / img.naturalHeight;

        let width = maxDimension;
        let height = maxDimension;

        if (aspectRatio > 1) {
          height = width / aspectRatio;
        } else {
          width = height * aspectRatio;
        }

        const newSettings = {
          ...settings,
          url,
          width,
          height,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          x: 0,
          y: 0,
          zoom: 100,
          rotation: 0,
          opacity: 100,
        };

        setSettings(newSettings);
        onSettingsChange(newSettings);
      };
      img.src = url;
    }
  };

  const handleSettingChange = (key: keyof ImageSettings, value: number) => {
    if (key === "width" && settings.naturalWidth > 0) {
      const aspectRatio = settings.naturalWidth / settings.naturalHeight;
      const newHeight = value / aspectRatio;
      const newSettings = {
        ...settings,
        width: value,
        height: newHeight,
      };
      setSettings(newSettings);
      onSettingsChange(newSettings);
    } else if (key === "height" && settings.naturalHeight > 0) {
      const aspectRatio = settings.naturalWidth / settings.naturalHeight;
      const newWidth = value * aspectRatio;
      const newSettings = {
        ...settings,
        height: value,
        width: newWidth,
      };
      setSettings(newSettings);
      onSettingsChange(newSettings);
    } else {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      onSettingsChange(newSettings);
    }
  };

  return (
    <div className="bg-[#2c2c2c] p-4 mt-2">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-xs font-medium">Image</h3>
            <span className="text-xs text-zinc-400">Image 1</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Image</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="w-full bg-zinc-900"
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Width</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={Math.round(settings.width)}
                  onChange={(e) =>
                    handleSettingChange("width", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.width]}
                  max={200}
                  step={1}
                  onValueChange={([value]) =>
                    handleSettingChange("width", value)
                  }
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Height</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  value={Math.round(settings.height)}
                  onChange={(e) =>
                    handleSettingChange("height", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.height]}
                  max={200}
                  step={1}
                  onValueChange={([value]) =>
                    handleSettingChange("height", value)
                  }
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">X Position</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  type="number"
                  value={settings.x}
                  onChange={(e) =>
                    handleSettingChange("x", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.x]}
                  min={-700}
                  max={700}
                  step={1}
                  onValueChange={([value]) => handleSettingChange("x", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Y Position</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  type="number"
                  value={settings.y}
                  onChange={(e) =>
                    handleSettingChange("y", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.y]}
                  min={-600}
                  max={600}
                  step={1}
                  onValueChange={([value]) => handleSettingChange("y", value)}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Zoom</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  type="number"
                  value={settings.zoom}
                  onChange={(e) =>
                    handleSettingChange("zoom", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.zoom]}
                  min={10}
                  max={200}
                  step={1}
                  onValueChange={([value]) =>
                    handleSettingChange("zoom", value)
                  }
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Rotation</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  type="number"
                  value={settings.rotation}
                  onChange={(e) =>
                    handleSettingChange("rotation", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.rotation]}
                  min={-200}
                  max={200}
                  step={1}
                  onValueChange={([value]) =>
                    handleSettingChange("rotation", value)
                  }
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center ">
              <label className="text-zinc-400 text-xs">Opacity</label>
              <div className="flex items-center gap-2 mt-1 col-span-2">
                <Input
                  type="number"
                  value={settings.opacity}
                  onChange={(e) =>
                    handleSettingChange("opacity", Number(e.target.value))
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[settings.opacity]}
                  min={-200}
                  max={200}
                  step={1}
                  onValueChange={([value]) =>
                    handleSettingChange("opacity", value)
                  }
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
