import { BranchContext } from '@contexts';
import { useContext } from 'react';

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('BranchProvider');
  }
  return context;
};
