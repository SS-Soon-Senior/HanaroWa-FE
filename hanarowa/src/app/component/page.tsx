import { IcCalendar } from '@/assets/svg';
import IcBell from '@/assets/svg/IcBell';
import IcSearch from '@/assets/svg/IcSearch';
import { Button, IconButton } from '@/components/atoms';

const Page = () => (
  <div>
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
  </div>
);

export default Page;
