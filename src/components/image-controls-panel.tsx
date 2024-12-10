import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export function ImageControlsPanel() {
  return (
    <div className="border-t border-zinc-800 p-4">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-medium">Image</h3>
            <span className="text-xs text-zinc-400">Image 1</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Image</label>

              <div className="flex items-center gap-2 mt-1">
                <Input id="picture" type="file" className="w-16 bg-zinc-900" />
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
              <label className="text-sm text-zinc-400">X</label>
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
              <label className="text-sm text-zinc-400">Y</label>
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
              <label className="text-sm text-zinc-400">Zoom</label>
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
              <label className="text-sm text-zinc-400">Rotation</label>
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
              <label className="text-sm text-zinc-400">Opacity</label>
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
      </div>
    </div>
  );
}
