"use client";

import {
  ChevronDown,
  Eye,
  Type,
  BarChart3,
  Image,
  Box,
  Sun,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddLayerModal } from "./add-layer-modal";

export function LayersPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSceneExpanded, setIsSceneExpanded] = useState(true);

  function handleLayerSelect(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col bg-[#1E1E1E]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-medium text-gray-400">LAYERS</h2>
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 p-2 bg-[#2D2D2D] rounded">
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 text-gray-400 hover:text-gray-200"
            onClick={() => setIsSceneExpanded(!isSceneExpanded)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isSceneExpanded ? "rotate-0" : "-rotate-90"
              }`}
            />
          </Button>
          <Image className="w-4 h-4 text-gray-400" />
          <span className="text-gray-200 text-xs">Scene 1</span>
          <Eye className="w-4 h-4 ml-auto text-gray-400" />
        </div>
        {isSceneExpanded && (
          <>
            <div className="flex items-center gap-2 p-2 hover:bg-[#2D2D2D] rounded ml-4">
              <Type className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-200">Text 1</span>
              <Eye className="w-4 h-4 ml-auto text-gray-400" />
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#2D2D2D] rounded ml-4">
              <BarChart3 className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-200">Bar Spectrum 1</span>
              <Eye className="w-4 h-4 ml-auto text-gray-400" />
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#2D2D2D] rounded ml-4">
              <Box className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-200">Image 1</span>
              <Eye className="w-4 h-4 ml-auto text-gray-400" />
            </div>
          </>
        )}
      </div>
      <div className="h-px bg-[#2D2D2D] mt-4" />
      <div className="flex flex-row text-white items-center justify-between py-1 px-2 bg-zinc-700">
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-purple-600 p-2"
        >
          <Image className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-purple-600 p-2"
        >
          <Box className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-purple-600 p-2"
        >
          <Sun className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-purple-600 p-2"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-purple-600 p-2"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-purple-600 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <AddLayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectLayer={handleLayerSelect}
      />
    </div>
  );
}
