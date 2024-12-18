export interface WaveSpectrumSettings {
  maxDb: number;
  minFrequency: number;
  maxFrequency: number;
  smoothing: number;
  width: number;
  height: number;
  stroke: boolean;
  isStrokeAuto: boolean;
  strokeColor: string;
  fillColor: string;
  taperEdges: boolean;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
}

export const defaultWaveSpectrumSettings: WaveSpectrumSettings = {
  maxDb: -20,
  minFrequency: -60,
  maxFrequency: 20000,
  smoothing: 0.8,
  width: 800,
  height: 200,
  stroke: true,
  isStrokeAuto: true,
  strokeColor: "#ffffff",
  fillColor: "#fffff",
  taperEdges: false,
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 100,
};
