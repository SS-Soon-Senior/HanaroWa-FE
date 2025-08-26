'use client';

import { createContext, useState, ReactNode } from 'react';

interface BranchContextType {
  location: string;
  branch: string;
  setLocation: (location: string, branch: string) => void;
}

export const BranchContext = createContext<BranchContextType | null>(null);

export const BranchProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocationState] = useState('춘천');
  const [branch, setBranchState] = useState('하나50+ 컬처뱅크');

  const setLocation = (newLocation: string, newBranch: string) => {
    setLocationState(newLocation);
    setBranchState(newBranch);
  };

  return (
    <BranchContext.Provider value={{ location, branch, setLocation }}>
      {children}
    </BranchContext.Provider>
  );
};
