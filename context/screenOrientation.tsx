import React, { ReactNode, createContext, useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

interface ScreenOrientationContextProps {
  mode: ScreenOrientation.Orientation;
  handleToggle: () => void;
  handleLandscape: () => void;
  handlePortrait: () => void;
  isLandscape: boolean;
  isPortrait: boolean;
  loading: boolean;
}

export const ScreenOrientationContext =
  createContext<ScreenOrientationContextProps>({
    mode: ScreenOrientation.Orientation.PORTRAIT_UP,
    handleToggle: () => {},
    handleLandscape: () => {},
    handlePortrait: () => {},
    isLandscape: false,
    isPortrait: false,
    loading: true,
  });

export const ScreenOrientationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [mode, setMode] = useState(ScreenOrientation.Orientation.PORTRAIT_UP);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    const currentMode = await ScreenOrientation.getOrientationAsync();
    setMode(currentMode);
    setLoading(false);
  };
  const handleToggle = () => {
    if (mode === ScreenOrientation.Orientation.PORTRAIT_UP) handleLandscape();
    else handlePortrait();
  };
  const handleLandscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
    setMode(ScreenOrientation.Orientation.LANDSCAPE_LEFT);
  };
  const handlePortrait = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    setMode(ScreenOrientation.Orientation.PORTRAIT_UP);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <ScreenOrientationContext.Provider
      value={{
        mode,
        loading,
        handleToggle,
        handleLandscape,
        handlePortrait,
        isLandscape: mode === ScreenOrientation.Orientation.LANDSCAPE_LEFT,
        isPortrait: mode === ScreenOrientation.Orientation.PORTRAIT_UP,
      }}
    >
      {children}
    </ScreenOrientationContext.Provider>
  );
};
