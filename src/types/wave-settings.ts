export interface WaveSettings {
  lineWidth: number;
  wavelength: number;
  smoothing: number;
  stroke: boolean;
  strokeColor: string;
  fill: boolean;
  fillColor: string;
  taperEdges: boolean;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
}

export const defaultWaveSettings = {
  lineWidth: 1,
  wavelength: 0,
  smoothing: 0,
  stroke: true,
  strokeColor: "#FFFFFF",
  fill: false,
  fillColor: "#FFFFFF",
  taperEdges: false,
  width: 854,
  height: 240,
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 100,
};
