'use client';

import { useFacilitylist } from '@/apis/facility';
import { Header, Layout, RoomReservationCard, StatusTag } from '@/components';

const Page = () => {
  const { data } = useFacilitylist();
  const dto = data?.result;

  return (
    <Layout header={<Header title='시설 예약 목록' />}>
      <div className='flex flex-col gap-[1.8rem]'>
        <div>
          <StatusTag status='reservation' />
        </div>
        {dto?.map((d, i = 0) => (
          <RoomReservationCard
            key={`facility-${i}`}
            startedAt={d?.startedAt || ''}
            placeName={d?.facilityName || ''}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
