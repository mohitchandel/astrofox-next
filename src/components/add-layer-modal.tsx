import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart3,
  Image as ImageIcon,
  Type,
  Waves,
  Box,
  Shapes,
} from "lucide-react";
import { useStateContext } from "@/context/StateContext";

interface AddLayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLayerModal({ isOpen, onClose }: AddLayerModalProps) {
  const {
    setOpenBarSpectrum,
    setOpenWave,
    setOpenImage,
    setOpenText,
    setOpenWaveSpectrum,
  } = useStateContext();

  const displayLayers = [
    {
      icon: BarChart3,
      label: "Bar Spectrum",
      type: "bar-spectrum",
      onclick: () => setOpenBarSpectrum(true),
    },
    { icon: Box, label: "Geometry (3D)", type: "geometry" },
    {
      icon: ImageIcon,
      label: "Image",
      type: "image",
      onclick: () => setOpenImage(true),
    },
    { icon: Shapes, label: "Shape", type: "shape" },
    {
      icon: Waves,
      label: "Sound Wave",
      type: "sound-wave",
      onclick: () => setOpenWave(true),
    },
    {
      icon: Type,
      label: "Text",
      type: "text",
      onclick: () => setOpenText(true),
    },
    {
      icon: Waves,
      label: "Wave Spectrum",
      type: "wave-spectrum",
      onclick: () => setOpenWaveSpectrum(true),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 gap-0 bg-zinc-900 text-zinc-100 w-[800px] max-w-[90vw]">
        <DialogHeader className="p-0">
          <div className="flex justify-between items-center p-4 border-b border-zinc-800">
            <DialogTitle className="text-lg font-normal">Add Layer</DialogTitle>
          </div>
        </DialogHeader>

        <Tabs defaultValue="displays" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-zinc-800 bg-transparent h-auto p-0">
            <TabsTrigger
              value="displays"
              className="px-8 py-3 rounded-none data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              Displays
            </TabsTrigger>
            <TabsTrigger
              value="effects"
              className="px-8 py-3 rounded-none data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="displays" className="p-6">
            <div className="grid grid-cols-5 gap-4">
              {displayLayers.map((layer) => (
                <button
                  key={layer.type}
                  className="flex flex-col items-center justify-center gap-3 h-32 bg-zinc-950 border-2 border-zinc-950 hover:border-purple-500 hover:bg-zinc-950 rounded-lg"
                  onClick={() => {
                    if (layer.onclick) {
                      layer.onclick();
                    }
                    onClose();
                  }}
                >
                  <layer.icon className="h-8 w-8" />
                  <span className="text-sm font-normal">{layer.label}</span>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="effects" className="p-6">
            <div className="grid grid-cols-5 gap-4">
              {/* Effects content would go here */}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
