'use client';

import { useGetFacilities } from '@/apis/facility';
import { BranchFilter, FacilityCard, Header, Layout } from '@/components';

const Page = () => {
  const { facilities, branchName } = useGetFacilities();

  return (
    <Layout header={<Header title='시설 예약하기' />}>
      <div className='flex w-full flex-col gap-7 p-4'>
        <BranchFilter branchName={branchName} onChangeBranch={() => {}} />
        {facilities.map((facility) => (
          <FacilityCard
            key={facility.facilityId}
            imageUrl={facility.mainImage?.imageUrl ?? '/default.png'}
            facilityName={facility.facilityName ?? ''}
            description={facility.facilityDescription ?? ''}
            height={200}
            onClick={() => console.log(`${facility.facilityName} 클릭`)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
