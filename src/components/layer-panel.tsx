import { Eye, Layers, Type, BarChart3, Image } from "lucide-react";

export function LayersPanel() {
  return (
    <div className="p-4">
      <h2 className="text-xs font-medium mb-4">LAYERS</h2>
      <div className="space-y-1">
        <div className="flex items-center gap-2 p-2 bg-purple-600 rounded">
          <Layers className="w-4 h-4" />
          <span className="text-sm">Scene 1</span>
          <Eye className="w-4 h-4 ml-auto" />
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded">
          <Type className="w-4 h-4" />
          <span className="text-sm">Text 1</span>
          <Eye className="w-4 h-4 ml-auto" />
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded">
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm">Bar Spectrum 1</span>
          <Eye className="w-4 h-4 ml-auto" />
        </div>
        <div className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded">
          <Image className="w-4 h-4" />
          <span className="text-sm">Image 1</span>
          <Eye className="w-4 h-4 ml-auto" />
        </div>
      </div>
    </div>
  );
}
