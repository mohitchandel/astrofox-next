export type LayerType =
  | "text"
  | "barSpectrum"
  | "wave"
  | "waveSpectrum"
  | "image";

export interface Layer {
  id: string;
  type: string;
  name: string;
  visible: boolean;
  zIndex: number;
  settings: any; // This will store the specific settings for each layer type
}
