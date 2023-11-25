import React, { ReactNode, createContext, useState } from "react";

export type HistoryType = {
  result: number;
  calculation: string;
};

interface HistoryContextProps {
  calculationHistories: HistoryType[];
  clearHistory: () => void;
  addHistory: (history: HistoryType) => void;
}

export const HistoryContext = createContext<HistoryContextProps>({
  calculationHistories: [],
  clearHistory: () => {},
  addHistory: () => {},
});

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [calculationHistories, setCalculationHistories] = useState<
    HistoryType[]
  >([]);
  const clearHistory = () => {
    setCalculationHistories([]);
  };
  const addHistory = (history: HistoryType) => {
    setCalculationHistories((prev) => [...prev, history]);
  };
  return (
    <HistoryContext.Provider
      value={{
        calculationHistories,
        clearHistory,
        addHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
