export interface ImageSettings {
  url: string;
  width: number;
  height: number;
  x: number;
  y: number;
  zoom: number;
  rotation: number;
  opacity: number;
  naturalWidth: number;
  naturalHeight: number;
}

export const defaultImageSettings: ImageSettings = {
  url: "",
  width: 100,
  height: 100,
  x: 0,
  y: 0,
  zoom: 100,
  rotation: 0,
  opacity: 100,
  naturalWidth: 0,
  naturalHeight: 0,
};
