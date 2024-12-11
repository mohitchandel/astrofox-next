import React, { useEffect, useRef } from "react";
import { BarSpectrumSettings } from "@/types/bar-spectrum";

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

  // Update the settingsRef whenever settings change
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    if (!audioElement) return;

    const setupAudioContext = async () => {
      // Clean up any existing audio context
      if (audioContextRef.current) {
        if (sourceRef.current) {
          sourceRef.current.disconnect();
        }
        await audioContextRef.current.close();
      }

      // Create new audio context and analyzer
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioElement);

      // Connect audio nodes
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      // Configure analyzer
      analyser.fftSize = 2048;

      // Store references
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      // Start visualization if audio is already playing
      if (!audioElement.paused) {
        draw();
      }
    };

    setupAudioContext();

    // Cleanup function
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

    const ctx = canvas.getContext("2d");
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

      // Clear canvas
      canvas.width = width;
      canvas.height = height + shadowHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate bar width and spacing
      const calculatedBarWidth = isBarWidthAuto
        ? (width / bufferLength) * 2.5
        : barWidth;

      const calculatedBarSpacing = isBarSpacingAuto
        ? calculatedBarWidth * 0.3
        : barSpacing;

      // Transform context based on settings
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.globalAlpha = opacity / 100;

      // Draw bars and shadows
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;
        const barX = i * (calculatedBarWidth + calculatedBarSpacing);

        // Draw shadow
        const gradient = ctx.createLinearGradient(
          0,
          height,
          0,
          height + shadowHeight
        );
        gradient.addColorStop(0, shadowColor);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(barX, height, calculatedBarWidth, shadowHeight);

        // Draw bar
        ctx.fillStyle = barColor;
        ctx.fillRect(barX, height - barHeight, calculatedBarWidth, barHeight);
      }

      ctx.restore();

      // Request next frame
      animationFrameRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        width: settings.width,
        height: settings.height + settings.shadowHeight,
      }}
    />
  );
};

export default AudioVisualizer;
