"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Layer, LayerType } from "@/types/layer";
import { v4 as uuidv4 } from "uuid";

interface LayerContextProps {
  layers: Layer[];
  activeLayerId: string | null;
  addLayer: (type: LayerType, settings: any) => void;
  removeLayer: (id: string) => void;
  updateLayer: (id: string, updates: Partial<Layer>) => void;
  setLayerVisibility: (id: string, visible: boolean) => void;
  reorderLayers: (startIndex: number, endIndex: number) => void;
  setActiveLayer: (id: string | null) => void;
}

const LayerContext = createContext<LayerContextProps | undefined>(undefined);

export function LayerProvider({ children }: { children: ReactNode }) {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

  const addLayer = (type: LayerType, settings: any) => {
    const newLayer: Layer = {
      id: uuidv4(),
      type,
      name: `${type} ${layers.filter((l) => l.type === type).length + 1}`,
      visible: true,
      zIndex: layers.length,
      settings,
    };
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
  };

  const removeLayer = (id: string) => {
    setLayers((prev) => prev.filter((layer) => layer.id !== id));
    if (activeLayerId === id) {
      setActiveLayerId(null);
    }
  };

  const updateLayer = (id: string, updates: Partial<Layer>) => {
    setLayers((prev) =>
      prev.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer))
    );
  };

  const setLayerVisibility = (id: string, visible: boolean) => {
    updateLayer(id, { visible });
  };

  const reorderLayers = (startIndex: number, endIndex: number) => {
    setLayers((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      // Update zIndex for all layers
      return result.map((layer, index) => ({
        ...layer,
        zIndex: result.length - index,
      }));
    });
  };

  const setActiveLayer = (id: string | null) => {
    setActiveLayerId(id);
  };

  return (
    <LayerContext.Provider
      value={{
        layers,
        activeLayerId,
        addLayer,
        removeLayer,
        updateLayer,
        setLayerVisibility,
        reorderLayers,
        setActiveLayer,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
}

export const useLayerContext = () => {
  const context = useContext(LayerContext);
  if (!context) {
    throw new Error("useLayerContext must be used within a LayerProvider");
  }
  return context;
};
