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
  const shadowsRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>(NaN);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Effect for analyzer setup and visualization
  useEffect(() => {
    if (!audioElement) return;

    // Clean up previous analyzer
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }

    // Create new analyzer with updated settings
    analyserRef.current = getAnalyser("bar-spectrum", {
      fftSize: 2048,
      smoothingTimeConstant: barSpectrumSettings.smoothing,
      maxDecibels: barSpectrumSettings.maxDb,
      minDecibels: barSpectrumSettings.minFrequency,
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
        const normalizedValue = (value / 255) * barSpectrumSettings.height;
        const shadowValue =
          normalizedValue * (barSpectrumSettings.shadowHeight / 100);

        // Update bar height without transition
        bar.style.height = `${normalizedValue}px`;

        // Update shadow height
        const shadow = shadowsRef.current[index];
        if (shadow) {
          shadow.style.height = `${shadowValue}px`;
        }
      });
    };

    const startVisualization = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
    };
  }, [audioElement, barSpectrumSettings, getAnalyser]);

  // Effect for creating and updating bars
  useEffect(() => {
    if (containerRef.current) {
      barsRef.current = [];
      shadowsRef.current = [];
      containerRef.current.innerHTML = "";

      const barContainer = document.createElement("div");
      barContainer.style.display = "flex";
      barContainer.style.alignItems = "flex-end";
      barContainer.style.justifyContent = "center";
      barContainer.style.width = "100%";
      barContainer.style.height = "100%";
      barContainer.style.position = "relative";

      // Create shadow container
      const shadowContainer = document.createElement("div");
      shadowContainer.style.position = "absolute";
      shadowContainer.style.bottom = "-10";
      shadowContainer.style.left = "0";
      shadowContainer.style.width = "100%";
      shadowContainer.style.display = "flex";
      shadowContainer.style.alignItems = "flex-start";
      shadowContainer.style.justifyContent = "center";
      shadowContainer.style.gap = barSpectrumSettings.isBarSpacingAuto
        ? `${2 / barCount}%`
        : `${barSpectrumSettings.barSpacing}px`;

      for (let i = 0; i < barCount; i++) {
        // Create bar
        const bar = document.createElement("div");
        const barWidth = barSpectrumSettings.isBarWidthAuto
          ? `${100 / barCount}%`
          : `${barSpectrumSettings.barWidth}px`;

        bar.style.width = barWidth;
        bar.style.height = "0px";
        bar.style.backgroundColor = barSpectrumSettings.barColor;
        bar.style.margin = barSpectrumSettings.isBarSpacingAuto
          ? `0 ${2 / barCount}%`
          : `0 ${barSpectrumSettings.barSpacing}px`;
        bar.style.opacity = `${barSpectrumSettings.opacity / 100}`;

        // Create shadow
        const shadow = document.createElement("div");
        shadow.style.width = barWidth;
        shadow.style.height = "0px";
        shadow.style.backgroundColor = barSpectrumSettings.shadowColor;
        shadow.style.opacity = "0.3";
        shadow.style.transform = "scaleY(-1)";
        shadow.style.filter = "blur(1px)";

        barContainer.appendChild(bar);
        shadowContainer.appendChild(shadow);

        barsRef.current.push(bar);
        shadowsRef.current.push(shadow);
      }

      containerRef.current.appendChild(barContainer);
      containerRef.current.appendChild(shadowContainer);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        barsRef.current = [];
        shadowsRef.current = [];
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
      }}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "transparent",
        }}
      ></div>
    </div>
  );
};

export default BarSpectrumVisualizer;
