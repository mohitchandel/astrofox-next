"use client";

import { useAudioElement } from "@/context/AudioContext";
import * as React from "react";
import WaveSurfer from "wavesurfer.js";

const WaveSurferVisualizer: React.FC<{}> = () => {
  const waveformRef = React.useRef<HTMLDivElement | null>(null);
  const waveSurferRef = React.useRef<WaveSurfer | null>(null);
  const { audioElement } = useAudioElement();

  React.useEffect(() => {
    if (waveformRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#2c2c2c",
        progressColor: "#6a49cc",
        height: 100,
        barWidth: 4,
      });
    }

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (audioElement && waveSurferRef.current) {
      waveSurferRef.current.load(audioElement.src);

      const syncPlayback = () => {
        waveSurferRef.current?.playPause();
      };
      audioElement.addEventListener("play", syncPlayback);
      audioElement.addEventListener("pause", syncPlayback);

      return () => {
        audioElement.removeEventListener("play", syncPlayback);
        audioElement.removeEventListener("pause", syncPlayback);
      };
    }
  }, [audioElement]);

  return <div ref={waveformRef}></div>;
};

export default WaveSurferVisualizer;
