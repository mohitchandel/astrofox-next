import { useAudioElement } from "@/context/AudioContext";
import { WaveSettings } from "@/types/wave-settings";
import React, { useEffect, useRef } from "react";

interface WaveVisualizerProps {
  pointCount?: number;
  waveSettings: WaveSettings;
}

const WaveVisualizer: React.FC<WaveVisualizerProps> = ({
  pointCount = 128,
  waveSettings,
}) => {
  const wavePathRef = useRef<SVGPathElement>(null);
  const fillPathRef = useRef<SVGPathElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const { audioElement, getAnalyser } = useAudioElement();

  useEffect(() => {
    if (!audioElement) return;

    // Get or create analyser
    analyserRef.current = getAnalyser("wave-visualizer", {
      fftSize: pointCount * 2,
      smoothingTimeConstant: waveSettings.smoothing,
    });

    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const visualize = () => {
      analyser.getByteTimeDomainData(dataArray);
      animationFrameRef.current = requestAnimationFrame(visualize);

      if (wavePathRef.current && fillPathRef.current) {
        let path = "";
        let fillPath = "";

        if (waveSettings.fill) {
          fillPath = `M 0 ${waveSettings.height} `;
        }

        dataArray.forEach((value, index) => {
          const x = (index / bufferLength) * waveSettings.width;
          let y = (value / 255) * waveSettings.height;

          if (waveSettings.taperEdges) {
            const taperFactor = Math.sin((index / bufferLength) * Math.PI);
            y = y * taperFactor;
          }

          if (waveSettings.wavelength > 0) {
            const wavelengthEffect = Math.sin(
              (index / bufferLength) * Math.PI * waveSettings.wavelength
            );
            y = y * (1 + wavelengthEffect * 0.3);
          }

          if (index === 0) {
            path += `M ${x} ${y} `;
            if (waveSettings.fill) fillPath += `L ${x} ${y} `;
          } else {
            path += `L ${x} ${y} `;
            if (waveSettings.fill) fillPath += `L ${x} ${y} `;
          }
        });

        if (waveSettings.fill) {
          fillPath += `L ${waveSettings.width} ${waveSettings.height} L 0 ${waveSettings.height} Z`;
        }

        if (waveSettings.stroke) {
          wavePathRef.current.setAttribute("d", path);
        } else {
          wavePathRef.current.setAttribute("d", "");
        }

        if (waveSettings.fill) {
          fillPathRef.current.setAttribute("d", fillPath);
        } else {
          fillPathRef.current.setAttribute("d", "");
        }
      }
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
  }, [audioElement, pointCount, waveSettings, getAnalyser]);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        transform: `translate(${waveSettings.x}px, ${waveSettings.y}px) rotate(${waveSettings.rotation}deg)`,
        width: waveSettings.width,
        height: waveSettings.height,
        position: "relative",
        opacity: `${waveSettings.opacity / 100}`,
      }}
    >
      <svg
        width={waveSettings.width}
        height={waveSettings.height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <path
          ref={fillPathRef}
          fill={waveSettings.fillColor}
          stroke="none"
          style={{ transition: "d 0.05s ease-out" }}
        />
        <path
          ref={wavePathRef}
          fill="none"
          stroke={waveSettings.strokeColor}
          strokeWidth={waveSettings.lineWidth}
          style={{ transition: "d 0.05s ease-out" }}
        />
      </svg>
    </div>
  );
};

export default WaveVisualizer;
