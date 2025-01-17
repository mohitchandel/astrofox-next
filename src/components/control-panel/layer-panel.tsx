"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  ChevronDown,
  Eye,
  EyeOff,
  Type,
  BarChart3,
  Image,
  Box,
  Sun,
  Trash2,
  Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddLayerModal } from "../add-layer-modal";
import { useLayerContext } from "@/context/LayerContext";
import { Layer } from "@/types/layer";

const LayerIcon = ({ type }: { type: Layer["type"] }) => {
  switch (type) {
    case "text":
      return <Type className="w-4 h-4 text-white" />;
    case "barSpectrum":
      return <BarChart3 className="w-4 h-4 text-white" />;
    case "wave":
      return <Waves className="w-4 h-4 text-white" />;
    case "waveSpectrum":
      return <Waves className="w-4 h-4 text-white" />;
    case "image":
      return <Image className="w-4 h-4 text-white" />;
    default:
      return <Box className="w-4 h-4 text-white" />;
  }
};

export function LayersPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSceneExpanded, setIsSceneExpanded] = useState(true);
  const {
    layers,
    activeLayerId,
    setLayerVisibility,
    reorderLayers,
    removeLayer,
    setActiveLayer,
  } = useLayerContext();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderLayers(result.source.index, result.destination.index);
  };

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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="layers">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="ml-4"
                >
                  {layers.map((layer, index) => (
                    <Draggable
                      key={layer.id}
                      draggableId={layer.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center gap-2 p-2 rounded ${
                            activeLayerId === layer.id
                              ? "bg-[#2D2D2D]"
                              : "hover:bg-[#2D2D2D]"
                          }`}
                          onClick={() => setActiveLayer(layer.id)}
                        >
                          <LayerIcon type={layer.type} />
                          <span className="text-xs text-gray-200">
                            {layer.name}
                          </span>
                          <div className="ml-auto flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setLayerVisibility(layer.id, !layer.visible);
                              }}
                              className="hover:bg-[#3D3D3D] p-1 rounded"
                            >
                              {layer.visible ? (
                                <Eye className="w-4 h-4 text-white" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-white" />
                              )}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeLayer(layer.id);
                              }}
                              className="hover:bg-[#3D3D3D] p-1 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
      </div>
      <AddLayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
