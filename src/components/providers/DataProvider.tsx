'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DEFAULT_IMEI, type AllowedIMEI } from '@/lib/constants/imeis';

interface DataContextType {
  selectedIMEI: string;
  setSelectedIMEI: (imei: string) => void;
  selectedCycle: number | null;
  setSelectedCycle: (cycle: number | null) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [selectedIMEI, setSelectedIMEI] = useState<string>(DEFAULT_IMEI);
  const [selectedCycle, setSelectedCycle] = useState<number | null>(null);

  return (
    <DataContext.Provider
      value={{
        selectedIMEI,
        setSelectedIMEI,
        selectedCycle,
        setSelectedCycle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
