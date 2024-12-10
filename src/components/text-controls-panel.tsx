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
import { useState, useEffect, JSX } from "react";

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

interface TextControlsPanelProps {
  onTextChange: (style: TextStyle) => void;
}

export function TextControlsPanel({
  onTextChange,
}: TextControlsPanelProps): JSX.Element {
  const [textStyle, setTextStyle] = useState<TextStyle>({
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

  const updateStyle = (updates: Partial<TextStyle>) => {
    setTextStyle((prev) => {
      const newStyle = { ...prev, ...updates };
      return newStyle;
    });
  };

  useEffect(() => {
    onTextChange(textStyle);
  }, [textStyle, onTextChange]);

  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium">TEXT</h3>
            <span className="text-xs text-zinc-400">Text 1</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Text</label>
              <Input
                defaultValue={textStyle.text}
                onChange={(e) => updateStyle({ text: e.target.value })}
                className="mt-1 bg-zinc-900"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Size</label>
              <Input
                type="number"
                defaultValue={textStyle.size}
                onChange={(e) => updateStyle({ size: Number(e.target.value) })}
                className="w-20 mt-1 bg-zinc-900"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Font</label>
              <Select
                defaultValue={textStyle.font}
                onValueChange={(value) => updateStyle({ font: value })}
              >
                <SelectTrigger className="w-full mt-1 bg-zinc-900">
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
              <label className="text-sm text-zinc-400">Italic</label>
              <Switch
                checked={textStyle.isItalic}
                onCheckedChange={(checked) =>
                  updateStyle({ isItalic: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Bold</label>
              <Switch
                checked={textStyle.isBold}
                onCheckedChange={(checked) => updateStyle({ isBold: checked })}
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">X</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  defaultValue={textStyle.x}
                  onChange={(e) => updateStyle({ x: Number(e.target.value) })}
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  defaultValue={[textStyle.x]}
                  onValueChange={([value]) => updateStyle({ x: value })}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Y</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  defaultValue={textStyle.y}
                  onChange={(e) => updateStyle({ y: Number(e.target.value) })}
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  defaultValue={[textStyle.y]}
                  onValueChange={([value]) => updateStyle({ y: value })}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Color</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="color"
                  defaultValue={textStyle.color}
                  onChange={(e) => updateStyle({ color: e.target.value })}
                  className="w-16 h-8 p-1 bg-zinc-900"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Rotation</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  defaultValue={textStyle.rotation}
                  onChange={(e) =>
                    updateStyle({ rotation: Number(e.target.value) })
                  }
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  defaultValue={[textStyle.rotation]}
                  onValueChange={([value]) => updateStyle({ rotation: value })}
                  max={360}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Opacity</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  defaultValue={textStyle.opacity}
                  onChange={(e) =>
                    updateStyle({ opacity: Number(e.target.value) })
                  }
                  className="w-16 bg-zinc-900"
                />
                <Slider
                  defaultValue={[textStyle.opacity]}
                  onValueChange={([value]) => updateStyle({ opacity: value })}
                  max={100}
                  step={1}
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
