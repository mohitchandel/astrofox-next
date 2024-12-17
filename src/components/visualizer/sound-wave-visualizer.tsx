import { useStateContext } from "@/context/StateContext";
import { WaveSettings } from "@/types/wave-settings";
import React, { useEffect, useRef, useCallback } from "react";

interface WaveVisualizerProps {
  audioElement: HTMLAudioElement | null;
  settings: WaveSettings;
}

const SoundWaveVisualizer: React.FC<WaveVisualizerProps> = ({
  audioElement,
  settings,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const { openWave } = useStateContext();

  const cleanupAudioContext = useCallback(async () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }

    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (error) {
        console.warn("Error disconnecting audio source:", error);
      }
      sourceRef.current = null;
    }

    // Close audio context safely
    if (audioContextRef.current) {
      try {
        // Only close if not already closed
        if (audioContextRef.current.state !== "closed") {
          await audioContextRef.current.close();
        }
      } catch (error) {
        console.warn("Error closing audio context:", error);
      }
      audioContextRef.current = null;
    }

    // Clear analyzer
    if (analyserRef.current) {
      analyserRef.current = null;
    }
  }, []);

  // Main drawing function with settings applied
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    const renderFrame = () => {
      // Check if animation should continue
      if (!canvas || !analyserRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(renderFrame);

      // Apply width and height from settings
      canvas.width = settings.width;
      canvas.height = settings.height;

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      analyser.getFloatTimeDomainData(dataArray);

      ctx.save();
      // Apply translation and rotation
      ctx.translate(
        settings.width / 2 + settings.x,
        settings.height / 2 + settings.y
      );
      ctx.rotate((settings.rotation * Math.PI) / 180);
      ctx.translate(-settings.width / 2, -settings.height / 2);

      ctx.beginPath();
      // Apply line width from settings
      ctx.lineWidth = settings.lineWidth;

      // Apply wavelength setting
      const skip = Math.max(1, Math.floor(settings.wavelength / 10));
      const sliceWidth = (settings.width * 1.0) / (bufferLength / skip);
      let x = 0;

      for (let i = 0; i < bufferLength; i += skip) {
        const v = dataArray[i] * (settings.height / 2);
        const y = settings.height / 2 + v;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Apply smoothing to the line
          if (settings.smoothing > 0) {
            const prevX = x - sliceWidth;
            const prevY =
              settings.height / 2 + (dataArray[i - skip] * settings.height) / 2;
            ctx.bezierCurveTo(
              prevX + sliceWidth / 2,
              prevY,
              x - sliceWidth / 2,
              y,
              x,
              y
            );
          } else {
            ctx.lineTo(x, y);
          }
        }

        x += sliceWidth;
      }

      // Apply stroke settings
      if (settings.stroke) {
        ctx.shadowBlur = 5;
        ctx.shadowColor = settings.strokeColor;
        ctx.strokeStyle = settings.strokeColor;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Apply fill settings
      if (settings.fill) {
        ctx.lineTo(settings.width, settings.height);
        ctx.lineTo(0, settings.height);
        const fillColorWithAlpha = settings.fillColor
          .replace(")", ", 0.5)")
          .replace("rgb", "rgba");
        ctx.fillStyle = fillColorWithAlpha;
        ctx.fill();
      }

      ctx.restore();
    };

    renderFrame();
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [settings]);

  // Separate setup for audio context to make it more robust
  const setupAudioContext = useCallback(async () => {
    // First, cleanup any existing context
    await cleanupAudioContext();

    if (!audioElement) return;

    try {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioElement);

      // Apply smoothing from settings
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = settings.smoothing / 100;

      source.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      if (!audioElement.paused) {
        await audioContext.resume();
        draw();
      }
    } catch (error) {
      console.error("Error setting up audio context:", error);
    }
  }, [audioElement, settings.smoothing, draw, cleanupAudioContext]);

  useEffect(() => {
    setupAudioContext();

    if (!audioElement) return;

    const handlePlay = async () => {
      if (audioContextRef.current) {
        try {
          await audioContextRef.current.resume();
          draw();
        } catch (error) {
          console.error("Error resuming audio context:", error);
        }
      }
    };

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

      cleanupAudioContext();
    };
  }, [audioElement, setupAudioContext, draw, cleanupAudioContext]);

  if (!openWave) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        width: `${settings.width}px`,
        height: `${settings.height}px`,
        transform: `translate(-50%, -50%)`,
        top: "50%",
        left: "50%",
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};

export default SoundWaveVisualizer;
