'use client';

import useGetMyFacility from '@/apis/facility/useGetMyFacility';
import { Header, Layout, StatusTag, RoomReservationCard } from '@/components';

const Page = () => {
  const { data, refetch } = useGetMyFacility();
  const reservations = data?.result?.filter((f) => !f.isUsed) ?? [];
  const completes = data?.result?.filter((f) => f.isUsed) ?? [];

  return (
    <Layout header={<Header title='내 예약 내역' />}>
      <div className='flex w-full flex-col gap-8 p-4'>
        {/* 예약 중 섹션 */}
        {reservations.length > 0 && (
          <div className='space-y-4'>
            <StatusTag status='reservation' />
            {reservations.map((facility, index) => (
              <RoomReservationCard
                key={`reservation-${index}`}
                {...facility}
                refetch={refetch}
              />
            ))}
          </div>
        )}

        {reservations.length > 0 && completes.length > 0 && (
          <hr className='border-grayaaa space-y-4 border-t' />
        )}

        {/* 완료 섹션 */}
        {completes.length > 0 && (
          <div className='space-y-4'>
            <StatusTag status='complete' />
            {completes.map((facility, index) => (
              <RoomReservationCard
                key={`complete-${index}`}
                {...facility}
                refetch={refetch}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;
