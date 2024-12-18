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
import { AddLayerModal } from "../add-layer-modal";

export function LayersPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSceneExpanded, setIsSceneExpanded] = useState(true);

  return (
    <div className="flex flex-col bg-[#1e1e1e]">
      <div className="flex items-center justify-start my-4 px-4">
        <h2 className="text-xs font-medium text-white text-center">LAYERS</h2>
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2 p-2 bg-[#2D2D2D] rounded">
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4 p-0 text-white hover:text-gray-200"
            onClick={() => setIsSceneExpanded(!isSceneExpanded)}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isSceneExpanded ? "rotate-0" : "-rotate-90"
              }`}
            />
          </Button>
          <Image className="w-4 h-4 text-white" />
          <span className="text-gray-200 text-xs">Scene 1</span>
          <Eye className="w-4 h-4 ml-auto text-white" />
        </div>
        {isSceneExpanded && (
          <>
            <div className="flex items-center gap-2 p-2 hover:bg-[#2D2D2D] rounded ml-4">
              <Type className="w-4 h-4 text-white" />
              <span className="text-xs text-gray-200">Text 1</span>
              <Eye className="w-4 h-4 ml-auto text-white" />
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#2D2D2D] rounded ml-4">
              <BarChart3 className="w-4 h-4 text-white" />
              <span className="text-xs text-gray-200">Bar Spectrum 1</span>
              <Eye className="w-4 h-4 ml-auto text-white" />
            </div>
            <div className="flex items-center gap-2 p-2 hover:bg-[#2D2D2D] rounded ml-4">
              <Box className="w-4 h-4 text-white" />
              <span className="text-xs text-gray-200">Image 1</span>
              <Eye className="w-4 h-4 ml-auto text-white" />
            </div>
          </>
        )}
      </div>
      <div className="h-px bg-[#2D2D2D] mt-4" />
      <div className="flex flex-row text-white items-center justify-start py-1 px-2 bg-[#1a1a1a]">
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-primary p-2"
        >
          <Image className="w-3 h-3" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-primary p-2"
        >
          <Box className="w-3 h-3" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-primary p-2"
        >
          <Sun className="w-3 h-3" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-primary p-2"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-primary p-2"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hover:bg-primary p-2"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
      <AddLayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
