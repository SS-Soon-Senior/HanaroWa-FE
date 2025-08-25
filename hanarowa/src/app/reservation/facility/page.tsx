import { Header, Layout } from '@/components/atoms';
import { RoomReservationCard } from '@/components/facility';

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
    isUsed: false,
  },
  {
    roomName: '프로젝트룸 1',
    reserveHanDate: '2025.08.20',
    reservationDate: '8월 26일 (화) 오후 3:00',
    location: '서울특별시 성동구 알파코 제 2캠퍼스',
    isUsed: true,
  },
];

const Page = () => {
  return (
    <Layout header={<Header title='내 예약 내역' />}>
      <div className='flex flex-col gap-6 p-4'>
        {myfacilities.map(
          (
            { roomName, reserveHanDate, reservationDate, location, isUsed },
            index
          ) => (
            <RoomReservationCard
              key={index}
              roomName={roomName}
              reserveHanDate={reserveHanDate}
              reservationDate={reservationDate}
              location={location}
              isUsed={isUsed}
            />
          )
        )}
      </div>
    </Layout>
  );
};

export default Page;
