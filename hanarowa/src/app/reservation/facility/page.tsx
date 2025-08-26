import { Header, Layout, StatusTag, RoomReservationCard } from '@/components';

//더미 <<< 나중에 삭제해야함
const myfacilities = [
  {
    roomName: '프로젝트룸 1',
    reserveHanDate: '2025.08.25',
    reservationDate: '8월 25일 (월) 오후 3:00',
    location: '서울특별시 성동구 알파코 제 2캠퍼스',
    isUsed: false,
  },
  {
    roomName: '프로젝트룸 2',
    reserveHanDate: '2025.08.20',
    reservationDate: '8월 21일 (목) 오후 1:00',
    location: '서울특별시 성동구 알파코 제 2캠퍼스',
    isUsed: true,
  },
  {
    roomName: '프로젝트룸 1',
    reserveHanDate: '2025.08.20',
    reservationDate: '8월 26일 (화) 오후 3:00',
    location: '서울특별시 성동구 알파코 제 2캠퍼스',
    isUsed: false,
  },
];

const Page = () => {
  const reservations = myfacilities.filter((f) => !f.isUsed);
  const completes = myfacilities.filter((f) => f.isUsed);

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
