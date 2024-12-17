import React, { useEffect, useRef } from "react";
import { BarSpectrumSettings } from "@/types/bar-spectrum";
import { useStateContext } from "@/context/StateContext";

interface AudioVisualizerProps {
  audioElement: HTMLAudioElement | null;
  settings: BarSpectrumSettings;
}

const AudioVisualizer = ({ audioElement, settings }: AudioVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const settingsRef = useRef<BarSpectrumSettings>(settings);

  const { openBarSpectrum } = useStateContext();

  useEffect(() => {
    settingsRef.current = settings;
    if (canvasRef.current) {
      canvasRef.current.width = settings.width;
      canvasRef.current.height = settings.height + settings.shadowHeight;
    }
  }, [settings]);

  useEffect(() => {
    if (!audioElement) return;

    const setupAudioContext = async () => {
      if (audioContextRef.current) {
        if (sourceRef.current) {
          sourceRef.current.disconnect();
        }
        await audioContextRef.current.close();
      }

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioElement);

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = settings.smoothing;

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      if (!audioElement.paused) {
        draw();
      }
    };

    setupAudioContext();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
      if (audioContextRef.current?.state !== "closed") {
        audioContextRef.current?.close();
      }
    };
  }, [audioElement]);

  useEffect(() => {
    if (!audioElement) return;

    const handlePlay = () => draw();
    const handlePause = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    audioElement.addEventListener("play", handlePlay);
    audioElement.addEventListener("pause", handlePause);

    return () => {
      audioElement.removeEventListener("play", handlePlay);
      audioElement.removeEventListener("pause", handlePause);
    };
  }, [audioElement]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      const {
        width,
        height,
        shadowHeight,
        barColor,
        shadowColor,
        isBarWidthAuto,
        barWidth,
        isBarSpacingAuto,
        barSpacing,
        x,
        y,
        rotation,
        opacity,
      } = settingsRef.current;

      analyser.getByteFrequencyData(dataArray);

      // Clear with transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const calculatedBarWidth = isBarWidthAuto
        ? (width / bufferLength) * 2.5
        : barWidth;

      const calculatedBarSpacing = isBarSpacingAuto
        ? calculatedBarWidth * 0.3
        : barSpacing;

      ctx.save();
      ctx.translate(width / 2 + x, height / 2 + y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);

      // Set composite operation for better blending
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = opacity / 100;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        const barX = i * (calculatedBarWidth + calculatedBarSpacing);

        const gradient = ctx.createLinearGradient(
          0,
          height,
          0,
          height + shadowHeight
        );
        const shadowColorWithAlpha = shadowColor
          .replace(")", ", 0.5)")
          .replace("rgb", "rgba");
        gradient.addColorStop(0, shadowColorWithAlpha);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(barX, height, calculatedBarWidth, shadowHeight);

        // Draw bar with semi-transparency
        const barColorWithAlpha = barColor
          .replace(")", ", 0.8)")
          .replace("rgb", "rgba");
        ctx.fillStyle = barColorWithAlpha;
        ctx.fillRect(barX, height - barHeight, calculatedBarWidth, barHeight);
      }

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();
  };

  if (!openBarSpectrum) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        width: `${settings.width}px`,
        height: `${settings.height + settings.shadowHeight}px`,
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        pointerEvents: "none",
        mixBlendMode: "screen",
        zIndex: 1,
      }}
    />
  );
};

export default AudioVisualizer;