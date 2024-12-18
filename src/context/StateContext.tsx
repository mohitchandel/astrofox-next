"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface StateContextProps {
  openBarSpectrum: boolean;
  setOpenBarSpectrum: (val: boolean) => void;

  openWave: boolean;
  setOpenWave: (val: boolean) => void;

  openImage: boolean;
  setOpenImage: (val: boolean) => void;

  openText: boolean;
  setOpenText: (val: boolean) => void;

  openWaveSpectrum: boolean;
  setOpenWaveSpectrum: (val: boolean) => void;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

// Provider Component
export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [openBarSpectrum, setOpenBarSpectrum] = useState<boolean>(false);
  const [openWave, setOpenWave] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [openText, setOpenText] = useState<boolean>(false);
  const [openWaveSpectrum, setOpenWaveSpectrum] = useState<boolean>(false);

  return (
    <StateContext.Provider
      value={{
        openBarSpectrum,
        setOpenBarSpectrum,
        openWave,
        setOpenWave,
        openImage,
        setOpenImage,
        openText,
        setOpenText,
        openWaveSpectrum,
        setOpenWaveSpectrum,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom Hook
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
