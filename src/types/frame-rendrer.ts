export interface SceneDimensions {
  width: number;
  height: number;
}

export interface BaseLayerSettings {
  x: number;
  y: number;
  opacity: number;
  rotation: number;
  visible: boolean;
  zIndex: number;
}

export interface TextLayerSettings extends BaseLayerSettings {
  text: string;
  font: string;
  size: number;
  color: string;
  isItalic: boolean;
  isBold: boolean;
}

export interface ImageLayerSettings extends BaseLayerSettings {
  url: string;
  width: number;
  height: number;
  zoom: number;
}

export interface BarSpectrumSettings extends BaseLayerSettings {
  barWidth: number;
  barGap: number;
  height: number;
  color: string;
  smoothing: number;
}

export interface WaveSettings extends BaseLayerSettings {
  width: number;
  height: number;
  color: string;
  lineWidth: number;
  smoothing: number;
}

export type LayerType = "text" | "image" | "barSpectrum" | "wave";

export interface Layer {
  id: string;
  type: LayerType;
  settings:
    | TextLayerSettings
    | ImageLayerSettings
    | BarSpectrumSettings
    | WaveSettings;
  visible: boolean;
  zIndex: number;
}

export interface RenderOptions {
  width: number;
  height: number;
  fps: number;
  quality?: number;
}

export interface Frame {
  time: number;
  data: string;
}

export interface RenderSettings {
  width: number;
  height: number;
  fps: number;
  quality: number;
}
