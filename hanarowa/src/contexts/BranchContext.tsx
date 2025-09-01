'use client';

import { useGetBranch } from '@apis';
import { createContext, useState, ReactNode } from 'react';

export type Branch = {
  branchId: number | undefined;
  locationName: string;
  branchName: string;
};

interface BranchContextType {
  location: string;
  branch: string;
  setLocation: (location: string, branch: string) => void;
  branches: Branch[];
}

export const BranchContext = createContext<BranchContextType | null>(null);

export const BranchProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetBranch();
  const branches = data?.result ?? [];
  const [location, setLocationState] = useState<string>('');
  const [branch, setBranchState] = useState<string>('');

  const setLocation = (newLocation: string, newBranch: string) => {
    setLocationState(newLocation);
    setBranchState(newBranch);
  };

  return (
    <BranchContext.Provider value={{ location, branch, setLocation, branches }}>
      {children}
    </BranchContext.Provider>
  );
};
