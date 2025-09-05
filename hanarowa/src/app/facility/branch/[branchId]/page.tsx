'use client';

import { useGetFacility } from '@/apis/facility';
import {
  BranchFilter,
  BranchSelectModal,
  FacilityCard,
  Header,
  Layout,
} from '@/components';
import { components } from '@/types/api';
import { useGetMemberBranch } from '@apis';
import { useModal } from '@hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Branch = components['schemas']['BranchResponseDTO'];

const Page = () => {
  const { data: branchData } = useGetMemberBranch();
  const myBranch = branchData?.result;

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    if (myBranch) {
      setSelectedBranch(myBranch);
    }
  }, [myBranch]);

  const { data: response } = useGetFacility(selectedBranch?.branchId || 1);
  const facilities = response?.result?.facilities ?? [];

  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const handleBranchChange = () => openModal();
  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    closeModal();
  };
  console.log(selectedBranch);

  return (
    <Layout header={<Header title='시설 예약하기' />}>
      <div className='flex w-full flex-col gap-7 p-4'>
        <BranchFilter
          branchName={
            selectedBranch?.locationName + ' ' + selectedBranch?.branchName ||
            '지점 선택'
          }
          onChangeBranch={handleBranchChange}
        />
        {facilities.map(
          ({ facilityId, facilityName, facilityDescription, mainImage }) => (
            <FacilityCard
              key={facilityId}
              facilityId={facilityId!}
              imageUrl={mainImage?.facilityImage || ''}
              facilityName={facilityName ?? ''}
              description={facilityDescription ?? ''}
              height={200}
              onClick={() => router.push(`/facility/${facilityId}`)}
            />
          )
        )}
      </div>
      <BranchSelectModal
        isOpen={isOpen}
        onClose={closeModal}
        onSelect={handleBranchSelect}
      />
    </Layout>
  );
};

export default Page;
