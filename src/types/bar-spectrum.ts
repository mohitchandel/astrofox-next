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

export interface TextStyle {
  text: string;
  size: number;
  font: string;
  isItalic: boolean;
  isBold: boolean;
  x: number;
  y: number;
  color: string;
  rotation: number;
  opacity: number;
}
