'use client';

import { useGetFacilities } from '@/apis/facility';
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

  const { facilities, branchName } = useGetFacilities(selectedBranch?.branchId);

  const { isOpen, openModal, closeModal } = useModal();

  const handleBranchChange = () => {
    openModal();
  };

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    closeModal();
  };

  return (
    <Layout header={<Header title='시설 예약하기' />}>
      <div className='flex w-full flex-col gap-7 p-4'>
        <BranchFilter
          branchName={selectedBranch?.branchName || '지점 선택'}
          onChangeBranch={handleBranchChange}
        />
        {facilities.map((facility) => (
          <FacilityCard
            facilityId={facility.facilityId!}
            key={facility.facilityId}
            imageUrl={facility.mainImage?.imageUrl ?? '/default.png'}
            facilityName={facility.facilityName ?? ''}
            description={facility.facilityDescription ?? ''}
            height={200}
            onClick={() => console.log(`${facility.facilityName} 클릭`)}
          />
        ))}
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
