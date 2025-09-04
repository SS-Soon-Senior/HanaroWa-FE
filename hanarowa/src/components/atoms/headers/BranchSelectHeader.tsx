'use client';

import { IcArrowDown, IcByeoldol } from '@/assets/svg';
import useModal from '@/hooks/useModal';
import { useGetMemberBranch } from '@apis';
import { BranchSelectModal } from '../modals';

const BranchSelectHeader = () => {
  const { data, refetch } = useGetMemberBranch();
  const myBranch = data?.result;
  const { isOpen, openModal, closeModal } = useModal();

  const handleCloseModal = () => {
    refetch();
    closeModal();
  };

  return (
    <>
      <div className='w-full pt-[5rem]'>
        <header
          onClick={openModal}
          className='shadow-button bg-background flex w-full max-w-[768px] cursor-pointer flex-col items-center justify-center gap-2 rounded-full py-[1.5rem]'
        >
          <div className='flex flex-row items-center gap-[0.2rem]'>
            <IcByeoldol />
            <h2 className='font-bold-16 text-black'>나의 지점은?</h2>
          </div>
          <div className='flex items-center gap-[1rem]'>
            <h1 className='font-bold-24 text-black'>
              {myBranch?.locationName} {myBranch?.branchName}
            </h1>
            <IcArrowDown />
          </div>
        </header>

        <BranchSelectModal isOpen={isOpen} onClose={handleCloseModal} />
      </div>
    </>
  );
};

export default BranchSelectHeader;
