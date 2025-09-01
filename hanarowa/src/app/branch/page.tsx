'use client';

import { IcPlayByeoldol } from '@/assets/svg';
import { BranchButton, Layout } from '@/components';
import { useBranch } from '@/hooks';
import { components } from '@/types/api';
import { useRouter } from 'next/navigation';

type Branch = components['schemas']['BranchResponseDTO'];

const Page = () => {
  const { updateMyBranch, brancheSet } = useBranch();
  const router = useRouter();

  const onClickBranch = (branch: Branch) => {
    updateMyBranch(branch);
    router.push('/');
  };

  return (
    <Layout>
      <div className='bg-background sticky top-0 z-20 flex w-full flex-col items-center pt-[7rem] pb-[3rem]'>
        <IcPlayByeoldol className='mx-auto' />
        <h1 className='font-bold-30 text-main text-center'>지점 선택하기</h1>
        <h2 className='font-medium-18 text-gray4a9 text-center'>
          내가 자주 이용하는 지점을 선택해주세요!
        </h2>
      </div>
      <div className='overflow-scroll overflow-y-auto'>
        <div className='grid grid-cols-2 gap-x-[1.5rem] gap-y-[2.4rem] pb-12'>
          {brancheSet.map(({ branchId, locationName, branchName }) => (
            <BranchButton
              key={branchId}
              location={locationName ?? ''}
              branch={branchName ?? ''}
              onClick={() =>
                onClickBranch({ branchId, locationName, branchName })
              }
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page;
