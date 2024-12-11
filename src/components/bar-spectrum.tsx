import { useRef, useEffect } from "react";
import { BarSpectrumSettings } from "@/types/bar-spectrum";

interface BarSpectrumProps {
  audioElement: HTMLAudioElement | null;
  settings: BarSpectrumSettings;
}

export function BarSpectrum({ audioElement, settings }: BarSpectrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioElement) return;

    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);

    analyzer.fftSize = 2048;
    analyzer.smoothingTimeConstant = settings.smoothing;

    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    audioContextRef.current = audioContext;
    analyzerRef.current = analyzer;

    return () => {
      audioContext.close();
    };
  }, [audioElement]);

  useEffect(() => {
    if (!analyzerRef.current || !canvasRef.current) return;

    const analyzer = analyzerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyzer.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Apply transformations
      ctx.save();
      ctx.translate(settings.x, settings.y);
      ctx.rotate((settings.rotation * Math.PI) / 180);
      ctx.globalAlpha = settings.opacity / 100;

      const barWidth = settings.isBarWidthAuto
        ? canvas.width / bufferLength
        : settings.barWidth;

      const spacing = settings.isBarSpacingAuto
        ? barWidth * 0.2
        : settings.barSpacing;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * settings.height;

        // Draw main bar
        ctx.fillStyle = settings.barColor;
        ctx.fillRect(
          i * (barWidth + spacing),
          canvas.height - barHeight,
          barWidth,
          barHeight
        );

        // Draw shadow
        ctx.fillStyle = settings.shadowColor;
        ctx.fillRect(
          i * (barWidth + spacing),
          canvas.height,
          barWidth,
          settings.shadowHeight
        );
      }

      ctx.restore();
      requestAnimationFrame(draw);
    };

    draw();
  }, [settings]);

  return (
    <canvas
      ref={canvasRef}
      width={settings.width}
      height={settings.height + settings.shadowHeight}
      className="bg-black"
    />
  );
}
