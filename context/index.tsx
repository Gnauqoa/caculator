import { ReactNode } from "react";
import { HistoryProvider } from "./history";
import { ScreenOrientationProvider } from "./screenOrientation";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ScreenOrientationProvider>
      <HistoryProvider>{children}</HistoryProvider>
    </ScreenOrientationProvider>
  );
};

export default ContextProvider;
