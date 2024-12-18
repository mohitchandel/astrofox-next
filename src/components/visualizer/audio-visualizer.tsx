import { useAudioElement } from "@/context/AudioContext";
import { BarSpectrumSettings } from "@/types/bar-spectrum";
import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

interface AudioVisualizerProps {
  barCount?: number;
  barSpectrumSettings: BarSpectrumSettings;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  barCount = 64,
  barSpectrumSettings,
}) => {
  const { audioElement } = useAudioElement();

  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!audioElement) return;

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();

    const { maxDb, minFrequency, smoothing } = barSpectrumSettings;

    const validatedMaxDb = Math.max(maxDb, -10);
    const validatedMinDb = Math.min(minFrequency, validatedMaxDb - 1);

    analyser.maxDecibels = validatedMaxDb;
    analyser.minDecibels = validatedMinDb;
    analyser.smoothingTimeConstant = smoothing;

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let source: MediaElementAudioSourceNode | null = null;

    const initAudio = () => {
      if (!source) {
        source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      }
      audioContext.resume();
      visualize();
    };

    const visualize = () => {
      analyser.getByteFrequencyData(dataArray);

      requestAnimationFrame(visualize);

      barsRef.current.forEach((bar, index) => {
        const value = dataArray[index];
        const normalizedValue = Math.max(value / 2, 10);
        bar.style.height = `${normalizedValue}px`;
        bar.style.boxShadow = `0px ${barSpectrumSettings.shadowHeight}px ${barSpectrumSettings.shadowColor}`;
      });
    };

    audioElement.addEventListener("play", initAudio);

    return () => {
      audioElement.removeEventListener("play", initAudio);
    };
  }, [barCount, barSpectrumSettings]);

  useEffect(() => {
    if (containerRef.current) {
      barsRef.current = [];
      containerRef.current.innerHTML = "";

      for (let i = 0; i < barCount; i++) {
        const bar = document.createElement("div");

        bar.style.width = barSpectrumSettings.isBarWidthAuto
          ? `${100 / barCount}%`
          : `${barSpectrumSettings.barWidth}px`;

        bar.style.height = "10px";
        bar.style.backgroundColor = barSpectrumSettings.barColor;
        bar.style.margin = barSpectrumSettings.isBarSpacingAuto
          ? `0 ${2 / barCount}%`
          : `0 ${barSpectrumSettings.barSpacing}px`;
        bar.style.transition = "height 0.1s ease-out";
        bar.style.flex = "1";
        bar.style.alignSelf = "flex-end";
        bar.style.opacity = `${barSpectrumSettings.opacity / 100}`;

        containerRef.current.appendChild(bar);
        barsRef.current.push(bar);
      }
    }

    return () => {
      console.log("Cleaning up bars...");
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        barsRef.current = [];
      }
    };
  }, [barCount, barSpectrumSettings]);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        transform: `translate(${barSpectrumSettings.x}px, ${barSpectrumSettings.y}px) rotate(${barSpectrumSettings.rotation}deg)`,
        width: barSpectrumSettings.width,
        height: barSpectrumSettings.height,
        position: "relative",
        opacity: `${barSpectrumSettings.opacity / 100}`,
      }}
    >
      <div
        ref={containerRef}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: "2px",
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
        }}
      ></div>
    </div>
  );
};

export default AudioVisualizer;
