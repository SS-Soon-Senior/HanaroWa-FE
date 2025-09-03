'use client';

import { useFacilitylist } from '@/apis/facility';
import { Header, Layout, RoomReservationCard, StatusTag } from '@/components';

const Page = () => {
  const { data } = useFacilitylist();
  const dto = data?.result;

  const used = dto?.filter((d) => d?.isUsed);
  const notUsed = dto?.filter((d) => !d?.isUsed);

  return (
    <Layout header={<Header title='시설 예약 목록' />}>
      <div className='flex flex-col gap-[1.8rem]'>
        <div>
          <StatusTag status='reservation' />
        </div>
        {notUsed?.map((d, i = 0) => (
          <RoomReservationCard
            key={i++}
            startedAt={d?.startedAt}
            reservedAt={d?.reservedAt}
            placeName={d?.branchName}
            userName={d?.memberName}
            facilityName={d?.facilityName}
            isUsed={true}
          />
        ))}
        <hr className='border-gray7eb' />
        <div>
          <StatusTag status='complete' />
        </div>
        {used?.map((d, i = 0) => (
          <RoomReservationCard
            key={i++}
            startedAt={d?.startedAt}
            reservedAt={d?.reservedAt}
            placeName={d?.branchName}
            userName={d?.memberName}
            facilityName={d?.facilityName}
            isUsed={false}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
