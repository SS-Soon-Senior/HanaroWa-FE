'use client';

import { Branch } from '@/contexts/BranchContext';
import { useBranch } from '@/hooks';
import { useEffect } from 'react';
import BranchButton from '../buttons/BranchButton';

type BranchSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BranchSelectModal = ({ isOpen, onClose }: BranchSelectModalProps) => {
  const { setLocation, branches } = useBranch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBranchSelect = (branch: Branch) => {
    setLocation(branch.locationName, branch.branchName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-60 flex flex-col items-center justify-center bg-black/70'
      onClick={onClose}
    >
      <h1 className='font-bold-30 mt-40 mb-20 text-center text-white'>
        내 지점 선택하기
      </h1>
      <div className='overflow-scroll overflow-y-auto'>
        <div className='grid grid-cols-2 gap-x-[1.5rem] gap-y-[2.4rem] pb-12'>
          {branches.map(({ branchId, locationName, branchName }) => (
            <BranchButton
              key={branchId}
              location={locationName}
              branch={branchName}
              onClick={() =>
                handleBranchSelect({ branchId, locationName, branchName })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchSelectModal;
