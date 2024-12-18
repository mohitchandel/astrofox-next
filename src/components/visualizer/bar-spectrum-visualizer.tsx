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

const BarSpectrumVisualizer: React.FC<AudioVisualizerProps> = ({
  barCount = 64,
  barSpectrumSettings,
}) => {
  const { audioElement, getAnalyser } = useAudioElement();
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>(NaN);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!audioElement) return;

    const { maxDb, minFrequency, smoothing } = barSpectrumSettings;

    // Get or create analyser
    analyserRef.current = getAnalyser("bar-spectrum", {
      fftSize: 256,
      smoothingTimeConstant: smoothing,
      maxDecibels: Math.max(maxDb, -10),
      minDecibels: Math.min(minFrequency, Math.max(maxDb, -10) - 1),
    });

    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const visualize = () => {
      analyser.getByteFrequencyData(dataArray);
      animationFrameRef.current = requestAnimationFrame(visualize);

      barsRef.current.forEach((bar, index) => {
        const value = dataArray[index];
        const normalizedValue = Math.max(value / 2, 10);
        bar.style.height = `${normalizedValue}px`;
        bar.style.boxShadow = `0px ${barSpectrumSettings.shadowHeight}px ${barSpectrumSettings.shadowColor}`;
      });
    };

    const startVisualization = () => {
      visualize();
    };

    if (!audioElement.paused) {
      startVisualization();
    }

    audioElement.addEventListener("play", startVisualization);

    return () => {
      audioElement.removeEventListener("play", startVisualization);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioElement, barSpectrumSettings, getAnalyser]);

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

export default BarSpectrumVisualizer;
