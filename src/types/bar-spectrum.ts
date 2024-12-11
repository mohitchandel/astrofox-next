export interface BarSpectrumConfig {
  maxDB: number;
  minFreq: number;
  maxFreq: number;
  smoothing: number;
  width: number;
  height: number;
  shadowHeight: number;
  barWidth: number;
  barSpacing: number;
  barColor: string;
  shadowColor: string;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
  autoBarWidth: boolean;
  autoBarSpacing: boolean;
}

export interface BarControlsPanelProps {
  config: BarSpectrumConfig;
  onChange: (config: BarSpectrumConfig) => void;
}

export const DEFAULT_BAR_CONFIG: BarSpectrumConfig = {
  maxDB: 100,
  minFreq: 20,
  maxFreq: 20000,
  smoothing: 0.8,
  width: 800,
  height: 200,
  shadowHeight: 20,
  barWidth: 2,
  barSpacing: 1,
  barColor: "#6366f1",
  shadowColor: "rgba(99, 102, 241, 0.2)",
  x: 0,
  y: 0,
  rotation: 0,
  opacity: 100,
  autoBarWidth: true,
  autoBarSpacing: true,
};

export interface BarSpectrumSettings {
  maxDb: number;
  minFrequency: number;
  maxFrequency: number;
  smoothing: number;
  width: number;
  height: number;
  shadowHeight: number;
  barWidth: number;
  isBarWidthAuto: boolean;
  barSpacing: number;
  isBarSpacingAuto: boolean;
  barColor: string;
  shadowColor: string;
  x: number;
  y: number;
  rotation: number;
  opacity: number;
}
