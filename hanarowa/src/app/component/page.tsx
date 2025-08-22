import { Button, Header, IconButton, SpotButton } from '@/components/atoms';
import { IcBell, IcCalendar, IcSearch } from '@svg';

const Page = () => (
  <div>
    <Header title='하나은행' back={true} />
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
      <div className='flex flex-row gap-5'>
        <SpotButton location='춘천' title='50+ 컬처뱅크' />
        <SpotButton location='춘천' title='50+ 컬처뱅크' />
      </div>
    </div>
  </div>
);

export default Page;
