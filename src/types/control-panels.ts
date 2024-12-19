import { TextStyle } from "./text-style";
import { BarSpectrumSettings } from "./bar-spectrum";
import { WaveSettings } from "./wave-settings";
import { WaveSpectrumSettings } from "./wave-spectrum";
import { ImageSettings } from "./image-setting";

export interface TextControlsPanelProps {
  settings: TextStyle;
  onSettingsChange: (settings: TextStyle) => void;
  layerNumber: number;
}

export interface BarControlsPanelProps {
  settings: BarSpectrumSettings;
  onSettingsChange: (settings: BarSpectrumSettings) => void;
  layerNumber: number;
}

export interface WaveControlsPanelProps {
  settings: WaveSettings;
  onSettingsChange: (settings: WaveSettings) => void;
  layerNumber: number;
}

export interface WaveSpectrumControlsPanelProps {
  settings: WaveSpectrumSettings;
  onSettingsChange: (settings: WaveSpectrumSettings) => void;
  layerNumber: number;
}

export interface ImageControlsPanelProps {
  settings: ImageSettings;
  onSettingsChange: (settings: ImageSettings) => void;
  layerNumber: number;
}
