"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BarChart3, Image, Type, Waves, Box, Shapes } from "lucide-react";

interface AddLayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLayer: (type: string) => void;
}

export function AddLayerModal({
  isOpen,
  onClose,
  onSelectLayer,
}: AddLayerModalProps) {
  const layerTypes = [
    { icon: BarChart3, label: "Bar Spectrum", type: "bar-spectrum" },
    { icon: Box, label: "Geometry (3D)", type: "geometry" },
    { icon: Image, label: "Image", type: "image" },
    { icon: Shapes, label: "Shape", type: "shape" },
    { icon: Type, label: "Text", type: "text" },
    { icon: Waves, label: "Wave Spectrum", type: "wave-spectrum" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Add Layer</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {layerTypes.map((layer) => (
            <Button
              key={layer.type}
              variant="outline"
              className="flex flex-col items-center justify-center gap-2 h-24 bg-slate-500"
              onClick={() => {
                onSelectLayer(layer.type);
                onClose();
              }}
            >
              <layer.icon className="h-8 w-8" />
              <span className="text-sm">{layer.label}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
