'use client';

import { IcPlayByeoldol } from '@/assets/svg';
import { BranchButton, Layout } from '@/components/atoms';
import { branches } from '@/components/atoms/modals/BranchSelectModal';
import { useBranch } from '@/hooks/useBranch';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { setLocation } = useBranch();
  const router = useRouter();

  const onClickBranch = (location: string, branch: string) => {
    setLocation(location, branch);
    router.push('/');
  };

  return (
    <Layout>
      <div className='bg-background sticky top-0 z-20 flex flex-col items-center pt-[7rem] pb-[4rem]'>
        <IcPlayByeoldol className='mx-auto' />
        <h1 className='font-bold-30 text-main text-center'>지점 선택하기</h1>
      </div>
      <div className='overflow-scroll overflow-y-auto'>
        <div className='grid grid-cols-2 gap-x-[1.5rem] gap-y-[2.4rem] pb-12'>
          {branches.map(({ id, location, branch }) => (
            <BranchButton
              key={id}
              location={location}
              branch={branch}
              onClick={() => onClickBranch(location, branch)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
