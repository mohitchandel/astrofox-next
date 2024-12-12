"use client";
import { Eye, Layers, Type, BarChart3, Image, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddLayerModal } from "@/components/add-layer-modal";
import { useState } from "react";

export function LayersPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLayerSelect = (type: string) => {
    // Handle layer selection here
    console.log("Selected layer type:", type);
  };

  return (
    <div className="flex flex-col">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-medium">LAYERS</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
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
      <div className="h-px bg-zinc-800" />
      <AddLayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectLayer={handleLayerSelect}
      />
    </div>
  );
}
