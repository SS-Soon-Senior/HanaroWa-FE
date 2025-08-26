'use client';

import { IcArrowDown, IcByeoldol } from '@/assets/svg';
import useModal from '@/hooks/useModal';
import { BranchSelectModal } from '../modals';

type Props = {
  location: string;
  title: string;
  admin?: boolean;
};

const BranchSelectHeader = ({ location, title, admin = false }: Props) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      {admin ? (
        <>
          <header
            onClick={openModal}
            className='bg-background fixed inset-0 top-0 z-40 mx-auto flex h-[9rem] max-w-[768px] cursor-pointer items-center justify-center gap-2 px-[2rem] py-[2rem]'
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
      ) : (
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
                {location} {title}
              </h1>
              <IcArrowDown />
            </div>
          </header>

          <BranchSelectModal isOpen={isOpen} onClose={closeModal} />
        </div>
      )}
    </>
  );
};

export default BranchSelectHeader;
