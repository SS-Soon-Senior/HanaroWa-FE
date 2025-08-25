'use client';

import { useBranch } from '@/hooks';
import BranchButton from '../buttons/BranchButton';

const branches: Branch[] = [
  { id: 1, location: '춘천', branch: '50+ 컬처뱅크' },
  { id: 2, location: '대전', branch: '50+ 컬처뱅크' },
  { id: 3, location: '광주', branch: '1968 라운지' },
  { id: 4, location: '서울', branch: '하나더넥스트' },
  { id: 5, location: '광주', branch: '1968 라운지' },
  { id: 6, location: '광주', branch: '1968 라운지' },
  { id: 7, location: '광주', branch: '1968 라운지' },
  { id: 8, location: '서울', branch: '하나더넥스트' },
];

type Branch = {
  id: number;
  location: string;
  branch: string;
};

type BranchSelectModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BranchSelectModal = ({ isOpen, onClose }: BranchSelectModalProps) => {
  const { setLocation } = useBranch();

  const handleBranchSelect = (branch: Branch) => {
    setLocation(branch.location, branch.branch);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70'
      onClick={onClose}
    >
      <h1 className='font-bold-30 mt-40 mb-20 text-center text-white'>
        지점 선택하기
      </h1>
      <div className='overflow-scroll overflow-y-auto'>
        <div className='grid grid-cols-2 gap-x-[1.5rem] gap-y-[2.4rem] pb-12'>
          {branches.map(({ id, location, branch }) => (
            <BranchButton
              key={id}
              location={location}
              branch={branch}
              onClick={() => handleBranchSelect({ id, location, branch })}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchSelectModal;
