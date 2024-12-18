import React, { useEffect, useRef, useState } from "react";
import { useAudioElement } from "@/context/AudioContext";
import { WaveSpectrumSettings } from "@/types/wave-spectrum";

interface AudioVisualizerProps {
  waveSpectrumSettings: WaveSpectrumSettings;
}

const WaveSpectrumVisualizer: React.FC<AudioVisualizerProps> = ({
  waveSpectrumSettings,
}) => {
  const { audioElement, getAnalyser } = useAudioElement();
  const containerRef = useRef<HTMLDivElement>(null);
  const [waveData, setWaveData] = useState<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!audioElement) return;

    // Get or create analyser
    analyserRef.current = getAnalyser("wave-spectrum", {
      fftSize: 2048,
      smoothingTimeConstant: waveSpectrumSettings.smoothing,
      maxDecibels: waveSpectrumSettings.maxDb,
      minDecibels: waveSpectrumSettings.minFrequency,
    });

    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const visualize = () => {
      analyser.getByteFrequencyData(dataArray);

      // Create a smoother curve by averaging nearby frequencies
      const smoothedData = [];
      const smoothingFactor = 4;
      for (let i = 0; i < bufferLength; i += smoothingFactor) {
        const slice = dataArray.slice(i, i + smoothingFactor);
        const average = slice.reduce((a, b) => a + b, 0) / slice.length;
        smoothedData.push(average);
      }

      // Normalize and scale the data
      const normalizedData = smoothedData.map((value) => {
        return (value / 255) * 100; // Normalize to percentage
      });

      setWaveData(normalizedData);
      animationFrameRef.current = requestAnimationFrame(visualize);
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
  }, [audioElement, waveSpectrumSettings, getAnalyser]);

  return (
    <div
      className="flex flex-col items-center"
      style={{
        transform: `translate(${waveSpectrumSettings.x}px, ${waveSpectrumSettings.y}px) rotate(${waveSpectrumSettings.rotation}deg)`,
        width: waveSpectrumSettings.width,
        height: waveSpectrumSettings.height,
        position: "relative",
        opacity: `${waveSpectrumSettings.opacity / 100}`,
      }}
    >
      <div ref={containerRef} className="w-full h-full relative">
        {waveData.length > 0 && (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${waveSpectrumSettings.width} ${waveSpectrumSettings.height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={waveSpectrumSettings.fillColor}
                  stopOpacity="1"
                />
                <stop
                  offset="100%"
                  stopColor={waveSpectrumSettings.fillColor}
                  stopOpacity="0.3"
                />
              </linearGradient>
            </defs>
            <path
              d={generateSmoothPath(waveData, waveSpectrumSettings)}
              fill="url(#waveGradient)"
              stroke={waveSpectrumSettings.strokeColor}
              strokeWidth={waveSpectrumSettings.stroke ? 1 : 0}
              strokeOpacity="0.5"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const generateSmoothPath = (
  data: number[],
  settings: WaveSpectrumSettings
): string => {
  const width = settings.width;
  const height = settings.height;
  const points: [number, number][] = [];

  // Generate points for the curve
  data.forEach((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - (value * height) / 100;
    points.push([x, y]);
  });

  // Create a smooth curve using cubic bezier
  let path = `M 0 ${height} L ${points[0][0]} ${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];

    // Calculate control points for smooth curve
    const controlX1 = x1 + (x2 - x1) / 3;
    const controlX2 = x1 + ((x2 - x1) * 2) / 3;

    path += ` C ${controlX1} ${y1}, ${controlX2} ${y2}, ${x2} ${y2}`;
  }

  // Complete the path by connecting back to the bottom
  path += ` L ${width} ${height} Z`;

  return path;
};

export default WaveSpectrumVisualizer;
