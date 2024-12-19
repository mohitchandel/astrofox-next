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

export const defalutTextSetting = {
  text: "hello",
  size: 40,
  font: "roboto",
  isItalic: false,
  isBold: false,
  x: 0,
  y: 0,
  color: "#FFFFFF",
  rotation: 0,
  opacity: 100,
};
