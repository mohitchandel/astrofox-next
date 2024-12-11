import { useState, useEffect, useCallback } from "react";

export function useAudioControls(audioElement: HTMLAudioElement | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    if (!audioElement) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audioElement.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Set initial values
    setCurrentTime(audioElement.currentTime);
    setDuration(audioElement.duration || 0);
    setVolume(audioElement.volume * 100);

    // Add event listeners
    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("durationchange", handleDurationChange);
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("durationchange", handleDurationChange);
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [audioElement]);

  const togglePlay = useCallback(() => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  }, [audioElement, isPlaying]);

  const seekTo = useCallback(
    (time: number) => {
      if (!audioElement) return;
      audioElement.currentTime = time;
      setCurrentTime(time);
    },
    [audioElement]
  );

  const setVolumeLevel = useCallback(
    (level: number) => {
      if (!audioElement) return;
      const normalizedVolume = level / 100;
      audioElement.volume = normalizedVolume;
      setVolume(level);
    },
    [audioElement]
  );

  const restart = useCallback(() => {
    if (!audioElement) return;
    audioElement.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audioElement.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [audioElement, isPlaying]);

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seekTo,
    setVolumeLevel,
    restart,
  };
}
