"use client";

import React, { createContext, useContext, useState } from "react";

// Define a custom context value type for the audio element and the function to create it
interface AudioContextType {
  audioElement: HTMLAudioElement | null;
  createAudioElement: (src: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

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

  const createAudioElement = (src: string) => {
    const audio = new Audio(src);
    setAudioElement(audio);
  };

  return (
    <AudioContext.Provider value={{ audioElement, createAudioElement }}>
      {children}
    </AudioContext.Provider>
  );
};
