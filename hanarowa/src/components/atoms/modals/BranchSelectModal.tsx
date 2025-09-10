'use client';

import { components } from '@/types/api';
import { usePostBranch, useGetBranch } from '@apis';
import BranchButton from '../buttons/BranchButton';

type BranchSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (branch: Branch) => void;
};

type Branch = components['schemas']['BranchResponseDTO'];

const BranchSelectModal = ({
  isOpen,
  onClose,
  onSelect,
}: BranchSelectModalProps) => {
  const response = useGetBranch();
  const brancheSet = response.data?.result || [];
  const { mutate: updateMyBranch } = usePostBranch();

  const handleBranchSelect = (branch: Branch) => {
    if (!!onSelect) {
      onSelect(branch);
      return;
    }
    updateMyBranch({
      params: {
        path: {
          branchId: branch.branchId!,
        },
      },
    });
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
          {brancheSet.map(({ branchId, locationName, branchName }) => (
            <BranchButton
              key={branchId}
              location={locationName ?? ''}
              branch={branchName ?? ''}
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
