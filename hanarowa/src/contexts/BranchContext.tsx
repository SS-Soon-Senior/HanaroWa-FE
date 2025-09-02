'use client';

import { components } from '@/types/api';
import { useGetBranch, usePostBranch } from '@apis';
import { createContext, useState, ReactNode } from 'react';

type Branch = components['schemas']['BranchResponseDTO'];

interface BranchContextType {
  myBranch: Branch;
  updateMyBranch: (branch: Branch) => void;
  brancheSet: Branch[];
}

export const BranchContext = createContext<BranchContextType | null>(null);

export const BranchProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetBranch();
  const brancheSet: Branch[] = data?.result ?? [];
  const [myBranch, setMyBranch] = useState<Branch>({
    branchId: undefined,
    locationName: '',
    branchName: '',
  });
  const { mutate: mutationPostBranch } = usePostBranch();

  const updateMyBranch = (branch: Branch) => {
    setMyBranch({ ...branch });
    mutationPostBranch({
      params: {
        path: {
          branchId: branch.branchId ?? 0,
        },
      },
    });
  };

  return (
    <BranchContext.Provider value={{ myBranch, updateMyBranch, brancheSet }}>
      {children}
    </BranchContext.Provider>
  );
};
