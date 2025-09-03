import getMyFacility from '@/apis/facility/getMyFacility';
import { Header, Layout, StatusTag, RoomReservationCard } from '@/components';

const Page = async () => {
  const { data: myfacilities } = await getMyFacility();
  if (!myfacilities) return <div>예약 내역이 없습니다.</div>;
  const reservations = myfacilities.result?.filter((f) => !f.isUsed) ?? [];
  const completes = myfacilities.result?.filter((f) => f.isUsed) ?? [];
  return (
    <Layout header={<Header title='내 예약 내역' />}>
      <div className='flex w-full flex-col gap-8 p-4'>
        {/* 예약 중 섹션 */}
        {reservations.length > 0 && (
          <div className='space-y-4'>
            <StatusTag status='reservation' />
            {reservations.map((facility, index) => (
              <RoomReservationCard key={`reservation-${index}`} {...facility} />
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
              <RoomReservationCard key={`complete-${index}`} {...facility} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;
