'use client';

import { IcArrowDown, IcByeoldol } from '@/assets/svg';
import useModal from '@/hooks/useModal';
import { BranchSelectModal } from '../modals';

type Props = {
  location: string;
  title: string;
};

const BranchSelectHeader = ({ location, title }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <header
        onClick={openModal}
        className='bg-background fixed inset-0 top-0 z-40 mx-auto flex h-[6rem] max-w-[768px] cursor-pointer items-center justify-center gap-2 px-[2rem] py-[1rem]'
      >
        <div className='flex items-end gap-[1rem]'>
          <IcByeoldol className='mb-[-0.4rem]' />
          <h1 className='font-bold-24 text-black'>
            {location} {title}
          </h1>
        </div>
        <IcArrowDown />
      </header>

      <BranchSelectModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default BranchSelectHeader;
