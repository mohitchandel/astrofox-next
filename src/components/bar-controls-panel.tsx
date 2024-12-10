import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export function BarControlsPanel() {
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
              <label className="text-sm text-zinc-400">MaxDB</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Min Frequency</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Max Frequency</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Smoothing</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Width</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Height</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Shadow Height</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Bar Width</label>
              <Switch /> Auto Size
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Bar Spacing</label>
              <Switch /> Auto Size
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Bar Color</label>
              <Input type="text" />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Shadow Color</label>
              <Input type="text" />
            </div>

            <div>
              <label className="text-sm text-zinc-400">X</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
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
                <Input type="number" className="w-16 bg-zinc-900" />
                <Slider
                  defaultValue={[0]}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-400">Rotation</label>
              <div className="flex items-center gap-2 mt-1">
                <Input type="number" className="w-16 bg-zinc-900" />
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
                <Input type="number" className="w-16 bg-zinc-900" />
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
