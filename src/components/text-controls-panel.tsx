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

export function TextControlsPanel() {
  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium">SCENE</h3>
            <span className="text-xs text-zinc-400">Scene 1</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Blending</label>
              <Select defaultValue="normal">
                <SelectTrigger className="w-full mt-1 bg-zinc-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="multiply">Multiply</SelectItem>
                  <SelectItem value="screen">Screen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Opacity</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" value="1" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Mask</label>
              <Switch />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium">TEXT</h3>
            <span className="text-xs text-zinc-400">Text 1</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Text</label>
              <Input defaultValue="hello" className="mt-1 bg-zinc-900" />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Size</label>
              <Input
                type="number"
                defaultValue="40"
                className="w-20 mt-1 bg-zinc-900"
              />
            </div>
            <div>
              <label className="text-sm text-zinc-400">Font</label>
              <Select defaultValue="roboto">
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
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Bold</label>
              <Switch />
            </div>
            <div>
              <label className="text-sm text-zinc-400">X</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" value="0" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Y</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" value="0" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Colors</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="text" value="color" className="w-16 bg-zinc-900" />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Rotation</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" value="0" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Opacity</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" value="0" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[0]}
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
