"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

interface AudioContextType {
  audioElement: HTMLAudioElement | null;
  createAudioElement: (src: string) => void;
  getAnalyser: (id: string, options?: AnalyserOptions) => AnalyserNode | null;
  audioContext: AudioContext | null;
}

interface AnalyserOptions {
  fftSize?: number;
  smoothingTimeConstant?: number;
  minDecibels?: number;
  maxDecibels?: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

let sharedAudioContext: AudioContext | null = null;
let sharedSourceNode: MediaElementAudioSourceNode | null = null;

export const useAudioElement = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error(
      "useAudioElement must be used within an AudioElementProvider"
    );
  }
  return context;
};

export const AudioElementProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const analyserNodesRef = useRef<Map<string, AnalyserNode>>(new Map());

  const initializeAudioContext = (element: HTMLAudioElement) => {
    if (!sharedAudioContext) {
      sharedAudioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (!sharedSourceNode) {
      sharedSourceNode = sharedAudioContext.createMediaElementSource(element);
      sharedSourceNode.connect(sharedAudioContext.destination);
    }
  };

  const createAudioElement = (src: string) => {
    if (audioElement) {
      // Clean up previous connections
      analyserNodesRef.current.forEach((node) => node.disconnect());
      analyserNodesRef.current.clear();
    }

    const audio = new Audio(src);

    // Initialize context and source node when creating new audio element
    initializeAudioContext(audio);

    setAudioElement(audio);
  };

  const getAnalyser = (id: string, options?: AnalyserOptions) => {
    if (!sharedAudioContext || !sharedSourceNode) return null;

    // Return existing analyser if it exists
    if (analyserNodesRef.current.has(id)) {
      return analyserNodesRef.current.get(id)!;
    }

    // Create new analyser
    const analyser = sharedAudioContext.createAnalyser();

    // Apply options
    if (options) {
      if (options.fftSize) analyser.fftSize = options.fftSize;
      if (options.smoothingTimeConstant)
        analyser.smoothingTimeConstant = options.smoothingTimeConstant;
      if (options.minDecibels) analyser.minDecibels = options.minDecibels;
      if (options.maxDecibels) analyser.maxDecibels = options.maxDecibels;
    }

    // Connect source to analyser
    sharedSourceNode.connect(analyser);

    // Store analyser
    analyserNodesRef.current.set(id, analyser);

    return analyser;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      analyserNodesRef.current.forEach((node) => node.disconnect());
      analyserNodesRef.current.clear();
      if (sharedSourceNode) {
        sharedSourceNode.disconnect();
      }
      if (sharedAudioContext) {
        sharedAudioContext.close();
      }
      sharedSourceNode = null;
      sharedAudioContext = null;
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioElement,
        createAudioElement,
        getAnalyser,
        audioContext: sharedAudioContext,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
