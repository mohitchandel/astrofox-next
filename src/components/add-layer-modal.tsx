import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart3, Image as ImageIcon, Type, Waves } from "lucide-react";
import { useLayerContext } from "@/context/LayerContext";
import { defaultBarSpectrumSettings } from "@/types/bar-spectrum";
import { defaultWaveSettings } from "@/types/wave-settings";
import { defaultWaveSpectrumSettings } from "@/types/wave-spectrum";
import { defaultImageSettings } from "@/types/image-setting";
import { defalutTextSetting } from "@/types/text-style";

interface AddLayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddLayerModal({ isOpen, onClose }: AddLayerModalProps) {
  const { addLayer } = useLayerContext();

  const defaultSettings = {
    barSpectrum: defaultBarSpectrumSettings,
    wave: defaultWaveSettings,
    text: defalutTextSetting,
    waveSpectrum: defaultWaveSpectrumSettings,
    image: defaultImageSettings,
  };

  const displayLayers = [
    {
      icon: BarChart3,
      label: "Bar Spectrum",
      type: "barSpectrum" as const,
      settings: defaultSettings.barSpectrum,
    },
    {
      icon: Waves,
      label: "Sound Wave",
      type: "wave" as const,
      settings: defaultSettings.wave,
    },
    {
      icon: Type,
      label: "Text",
      type: "text" as const,
      settings: defaultSettings.text,
    },
    {
      icon: Waves,
      label: "Wave Spectrum",
      type: "waveSpectrum" as const,
      settings: defaultSettings.waveSpectrum,
    },
    {
      icon: ImageIcon,
      label: "Image",
      type: "image" as const,
      settings: defaultSettings.image,
    },
  ];

  const handleAddLayer = (type: string, settings: any) => {
    addLayer(type as any, settings);
    onClose();
  };

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
            {/* <TabsTrigger
              value="effects"
              className="px-8 py-3 rounded-none data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              Effects
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="displays" className="p-6">
            <div className="grid grid-cols-5 gap-4">
              {displayLayers.map((layer) => (
                <button
                  key={layer.type}
                  className="flex flex-col items-center justify-center gap-3 h-32 bg-zinc-950 border-2 border-zinc-950 hover:border-purple-500 hover:bg-zinc-950 rounded-lg"
                  onClick={() => handleAddLayer(layer.type, layer.settings)}
                >
                  <layer.icon className="h-8 w-8" />
                  <span className="text-sm font-normal">{layer.label}</span>
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="effects" className="p-6">
            <div className="grid grid-cols-5 gap-4"></div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
