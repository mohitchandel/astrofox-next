import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useEffect, JSX, useCallback, useRef } from "react";
import { TextControlsPanelProps } from "@/types/control-panels";
import { TextStyle } from "@/types/text-style";

export function TextControlsPanel({
  settings: initialSettings,
  onSettingsChange,
  layerNumber,
}: TextControlsPanelProps): JSX.Element {
  const [textStyle, setTextStyle] = useState<TextStyle>(initialSettings);

  useEffect(() => {
    setTextStyle(initialSettings);
  }, [initialSettings]);

  const debouncedCallback = useCallback(
    (newStyle: TextStyle) => {
      onSettingsChange(newStyle);
    },
    [onSettingsChange]
  );

  const updateStyle = useCallback(
    (updates: Partial<TextStyle>) => {
      setTextStyle((prev) => {
        const newStyle = { ...prev, ...updates };
        debouncedCallback(newStyle);
        return newStyle;
      });
    },
    [debouncedCallback]
  );

  return (
    <div className="bg-[#2c2c2c] p-4 mt-2">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <h3 className="text-xs font-medium">TEXT</h3>
            <span className="text-xs text-zinc-400">
              {`TEXT ${layerNumber}`}
            </span>
          </div>
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <label className="text-zinc-400">Text</label>
              <Input
                value={textStyle.text}
                onChange={(e) => updateStyle({ text: e.target.value })}
                className="mt-1 h-6 w-2/3 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-zinc-400">Size</label>
              <Input
                type="number"
                value={textStyle.size}
                onChange={(e) => updateStyle({ size: Number(e.target.value) })}
                className="mt-1 h-6 w-2/3 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-zinc-400">Font</label>
              <Select
                value={textStyle.font}
                onValueChange={(value) => updateStyle({ font: value })}
              >
                <SelectTrigger className="text-xs mt-1 h-6 w-2/3 bg-[#1a1a1a] border-zinc-700 focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="arial">Arial</SelectItem>
                  <SelectItem value="helvetica">Helvetica</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-zinc-400">Italic</label>
              <Switch
                className="data-[state=unchecked]:bg-[#1a1a1a]"
                checked={textStyle.isItalic}
                onCheckedChange={(checked) =>
                  updateStyle({ isItalic: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-zinc-400">Bold</label>
              <Switch
                className="data-[state=unchecked]:bg-[#1a1a1a]"
                checked={textStyle.isBold}
                onCheckedChange={(checked) => updateStyle({ isBold: checked })}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="text-zinc-400">X</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  value={textStyle.x}
                  onChange={(e) => updateStyle({ x: Number(e.target.value) })}
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[textStyle.x]}
                  onValueChange={([value]) => updateStyle({ x: value })}
                  max={200}
                  min={-200}
                  step={1}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-zinc-400">Y</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  value={textStyle.y}
                  onChange={(e) => updateStyle({ y: Number(e.target.value) })}
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[textStyle.y]}
                  onValueChange={([value]) => updateStyle({ y: value })}
                  max={200}
                  min={-200}
                  step={1}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-zinc-400">Color</label>
              <div className="flex items-center gap-2 mt-1 rounded-full">
                <Input
                  type="color"
                  value={textStyle.color}
                  onChange={(e) => updateStyle({ color: e.target.value })}
                  className="w-8 h-8 p-1 rounded-full"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-zinc-400">Rotation</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  value={textStyle.rotation}
                  onChange={(e) =>
                    updateStyle({ rotation: Number(e.target.value) })
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[textStyle.rotation]}
                  onValueChange={([value]) => updateStyle({ rotation: value })}
                  max={360}
                  step={1}
                  className="flex-1 w-1/2 bg-primary h-1"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-zinc-400">Opacity</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  value={textStyle.opacity}
                  onChange={(e) =>
                    updateStyle({ opacity: Number(e.target.value) })
                  }
                  className="w-1/3 h-6 bg-[#1a1a1a] border-zinc-700 focus:border-primary"
                />
                <Slider
                  value={[textStyle.opacity]}
                  onValueChange={([value]) => updateStyle({ opacity: value })}
                  max={100}
                  step={1}
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
