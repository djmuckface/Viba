"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface BoostContextType {
  selectedMood: string | null;
  selectedScenario: string | null;
  setSelectedMood: (mood: string | null) => void;
  setSelectedScenario: (scenario: string | null) => void;
  resetSelections: () => void;
}

const defaultContext: BoostContextType = {
  selectedMood: null,
  selectedScenario: null,
  setSelectedMood: () => {},
  setSelectedScenario: () => {},
  resetSelections: () => {},
};

const BoostContext = createContext<BoostContextType>(defaultContext);

export function BoostProvider({ children }: { children: ReactNode }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const resetSelections = () => {
    setSelectedMood(null);
    setSelectedScenario(null);
  };

  return (
    <BoostContext.Provider 
      value={{
        selectedMood,
        selectedScenario,
        setSelectedMood,
        setSelectedScenario,
        resetSelections,
      }}
    >
      {children}
    </BoostContext.Provider>
  );
}

export function useBoost(): BoostContextType {
  const context = useContext(BoostContext);
  if (!context) {
    throw new Error("useBoost must be used within a BoostProvider");
  }
  return context;
} 