export interface BarSpectrumSettings {
  maxDb: number;
  minFrequency: number;
  maxFrequency: number;
  smoothing: number;
  width: number;
  height: number;
  shadowHeight: number;
  barWidth: string;
  isBarWidthAuto: boolean;
  barSpacing: string;
  isBarSpacingAuto: boolean;
  barColor: string;
  shadowColor: string;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
}

export const defaultBarSpectrumSettings = {
  maxDb: -20,
  minFrequency: -60,
  maxFrequency: 20000,
  smoothing: 0.8,
  width: 800,
  height: 200,
  shadowHeight: 10,
  barWidth: "5",
  isBarWidthAuto: true,
  barSpacing: "2",
  isBarSpacingAuto: true,
  barColor: "#ffffff",
  shadowColor: "#003300",
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 100,
};
