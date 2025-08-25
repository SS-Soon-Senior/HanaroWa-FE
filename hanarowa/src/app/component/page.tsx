import {
  Button,
  Header,
  IconButton,
  Layout,
  SpotButton,
  BottomNavigation,
} from '@/components/atoms';
import ReservationCard from '@/components/atoms/ClassReservationCard';
import FacilityCard from '@/components/atoms/FacilityCard';
import RoomReservationCard from '@/components/atoms/RoomReservationCard';
import { IcBell, IcCalendar, IcSearch } from '@svg';

const Page = () => (
  <Layout header={<Header title='하나은행' />} footer={<BottomNavigation />}>
    <h1 className='font-bold-18 text-main'>하나은행</h1>
    <h1 className='font-medium-18'>하나은행</h1>
    <h1 className='font-regular-18'>하나은행</h1>
    <h1 className='font-light-18'>하나은행</h1>
    <div className='flex flex-col gap-4'>
      <Button variant='line' sizeType='lg'>
        강의 신청하러 가기
      </Button>
      <Button variant='green' sizeType='xs'>
        강의 신청하러 가기
      </Button>
    </div>
    <div className='flex flex-row gap-4'>
      <IconButton title='강좌 개설' icon={<IcBell />} />
      <IconButton title='내 예약' icon={<IcCalendar />} />
      <IconButton title='강좌 찾기' icon={<IcSearch />} />
    </div>
    <div className='flex flex-row gap-5'>
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
    </div>
    <div className='flex flex-row gap-5'>
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
    </div>{' '}
    <div className='flex flex-row gap-5'>
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
    </div>{' '}
    <div className='flex flex-row gap-5'>
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
      <SpotButton location='춘천' title='50+ 컬처뱅크' />
    </div>
    <div>
      <ReservationCard
        courseName='사랑의 배터리 충전하기'
        reserveHanDate='2024.03.09'
        reservationDate='3월 15일 (금) 오전 10:00'
        location='춘천 50+ 컬처뱅크'
        instructor='시영코코'
        isReviewed={true}
      ></ReservationCard>
    </div>
    <div>
      <RoomReservationCard
        roomName='디지털 크리에이터룸'
        reserveHanDate='2024.03.09'
        reservationDate='3월 15일 (금) 오후 2:00'
        location='춘천 50+ 컬처뱅크 301호'
        isUsed={true}
      ></RoomReservationCard>
    </div>
    <div>
      <FacilityCard
        imageUrl='/imgs/cinemaroom.png'
        facilityName='시네마룸'
        description='편안하게 영화를 볼 수 있는 공간'
        height={200}
      />
    </div>
  </Layout>
);

export default Page;
