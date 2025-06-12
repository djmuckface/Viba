"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface BoostHistoryContextType {
  addToHistory: (boost: string) => void;
  hasReachedDailyLimit: () => boolean;
  incrementUsage: () => void;
  getUsageCount: () => number;
}

const BoostHistoryContext = createContext<BoostHistoryContextType | undefined>(undefined);

interface BoostUsage {
  date: string;
  count: number;
}

const MAX_HISTORY_SIZE = 5;
const MAX_DAILY_REFRESHES = 20;

function getDateKey() {
  return new Date().toISOString().split('T')[0];
}

export function BoostHistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<string[]>([]);
  const [usage, setUsage] = useState<BoostUsage>(() => {
    if (typeof window === 'undefined') return { date: getDateKey(), count: 0 };
    
    const storedUsage = localStorage.getItem('boostUsage');
    if (!storedUsage) return { date: getDateKey(), count: 0 };
    
    const parsedUsage: BoostUsage = JSON.parse(storedUsage);
    if (parsedUsage.date !== getDateKey()) {
      return { date: getDateKey(), count: 0 };
    }
    
    return parsedUsage;
  });

  useEffect(() => {
    // Reset usage count at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const timer = setTimeout(() => {
      setUsage({ date: getDateKey(), count: 0 });
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  const addToHistory = (boost: string) => {
    setHistory(prev => {
      const newHistory = [boost, ...prev.slice(0, MAX_HISTORY_SIZE - 1)];
      return newHistory;
    });
  };

  const hasReachedDailyLimit = () => {
    return usage.count >= MAX_DAILY_REFRESHES;
  };

  const incrementUsage = () => {
    setUsage(prev => {
      const newUsage = {
        date: prev.date,
        count: prev.count + 1
      };
      localStorage.setItem('boostUsage', JSON.stringify(newUsage));
      return newUsage;
    });
  };

  const getUsageCount = () => {
    return usage.count;
  };

  return (
    <BoostHistoryContext.Provider value={{
      addToHistory,
      hasReachedDailyLimit,
      incrementUsage,
      getUsageCount,
    }}>
      {children}
    </BoostHistoryContext.Provider>
  );
}

export function useBoostHistory() {
  const context = useContext(BoostHistoryContext);
  if (context === undefined) {
    throw new Error('useBoostHistory must be used within a BoostHistoryProvider');
  }
  return context;
} 