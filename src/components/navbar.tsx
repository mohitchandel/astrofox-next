import { Input } from "@/components/ui/input";
import { useAudioElement } from "@/context/AudioContext";
import { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { useLayerContext } from "@/context/LayerContext";
import { toast } from "sonner";

interface NavbarProps {
  sceneDimensions?: {
    width: number;
    height: number;
  };
}

export default function Navbar({
  sceneDimensions = { width: 854, height: 480 },
}: NavbarProps) {
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const { audioElement, createAudioElement } = useAudioElement();
  const { layers } = useLayerContext();

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
      setFileName(file.name);
    }
  };

  useEffect(() => {
    if (audioSrc && !audioElement) {
      createAudioElement(audioSrc);
    }
  }, [audioSrc, audioElement, createAudioElement]);

  useEffect(() => {
    return () => {
      if (audioSrc) {
        URL.revokeObjectURL(audioSrc);
      }
    };
  }, [audioSrc]);

  // const exportVideo = async () => {
  //   if (!audioElement || !audioSrc) {
  //     toast.error("Please upload an audio file first");
  //     return;
  //   }

  //   setIsExporting(true);

  //   try {
  //     // Get the content of the visualization div
  //     const visualizationDiv = document.querySelector(
  //       ".bg-black.relative.flex"
  //     );
  //     if (!visualizationDiv) {
  //       throw new Error("Visualization container not found");
  //     }

  //     // Create a data object with all necessary information
  //     const exportData = {
  //       audioSrc,
  //       duration: audioElement.duration,
  //       width: sceneDimensions.width,
  //       height: sceneDimensions.height,
  //       fps: 30,
  //       layers: layers.map((layer) => ({
  //         ...layer,
  //         settings: {
  //           ...layer.settings,
  //           // Ensure all numeric values are actually numbers
  //           x: Number(layer.settings.x),
  //           y: Number(layer.settings.y),
  //           rotation: Number(layer.settings.rotation),
  //           opacity: Number(layer.settings.opacity),
  //           size: layer.settings.size ? Number(layer.settings.size) : undefined,
  //           zoom: layer.settings.zoom ? Number(layer.settings.zoom) : undefined,
  //         },
  //       })),
  //     };

  //     // Log the data being sent
  //     console.log("Sending export data:", JSON.stringify(exportData));

  //     const response = await fetch("/api/video-export", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(exportData),
  //     });

  //     if (!response.ok) {
  //       let errorMessage = `Export failed with status: ${response.status}`;
  //       try {
  //         const errorData = await response.json();
  //         errorMessage = errorData.details || errorData.error || errorMessage;
  //       } catch (e) {
  //         console.error("Error parsing error response:", e);
  //       }
  //       throw new Error(errorMessage);
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "visualization.mp4";
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);

  //     toast.success("Video exported successfully");
  //   } catch (error) {
  //     console.error("Export failed:", error);
  //     toast.error(
  //       error instanceof Error ? error.message : "Failed to export video"
  //     );
  //   } finally {
  //     setIsExporting(false);
  //   }
  // };

  const exportVideo = async () => {
    if (!audioElement || !audioSrc) {
      toast.error("Please upload an audio file first");
      return;
    }

    setIsExporting(true);

    try {
      // Get the audio file from the input element
      const audioInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      const audioFile = audioInput?.files?.[0];

      if (!audioFile) {
        throw new Error("No audio file found");
      }

      // Create FormData to send the file
      const formData = new FormData();
      formData.append("audio", audioFile);
      formData.append(
        "data",
        JSON.stringify({
          duration: audioElement.duration,
          width: sceneDimensions.width,
          height: sceneDimensions.height,
          fps: 30,
          layers,
        })
      );

      const response = await fetch("/api/video-export", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = `Export failed with status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.details || errorData.error || errorMessage;
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "visualization.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success("Video exported successfully");
    } catch (error) {
      console.error("Export failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to export video"
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-18 bg-zinc-900 border-t border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-end gap-4 h-10">
        <button
          className={`px-4 py-2 rounded transition-colors ${
            isExporting || !audioElement
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={exportVideo}
          disabled={isExporting || !audioElement}
        >
          {isExporting ? "Exporting..." : "Export Video"}
        </button>
        {fileName ? (
          <p className="text-sm text-zinc-400">Selected: {fileName}</p>
        ) : (
          <Label>Upload Audio</Label>
        )}
        <Input
          type="file"
          accept="audio/*"
          onChange={handleAudioUpload}
          className="bg-primary w-64 h-8 rounded-md text-white cursor-pointer transition duration-200 ease-in-out"
          aria-label="Upload audio"
          disabled={isExporting}
        />
      </div>
    </div>
  );
}
