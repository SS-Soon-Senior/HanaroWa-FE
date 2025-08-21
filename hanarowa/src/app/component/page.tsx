import IcBell from '@/assets/svg/IcBell';
import IcSearch from '@/assets/svg/IcSearch';
import { Button, IconButton } from '@/components/atoms';

const Page = () => (
  <div>
    <h1 className='font-bold-18 text-main'>하나은행</h1>
    <h1 className='font-medium-18'>하나은행</h1>
    <h1 className='font-regular-18'>하나은행</h1>
    <h1 className='font-light-18'>하나은행</h1>
    <Button variant='line' sizeType='lg'>
      강의 신청하러 가기
    </Button>
    <IconButton title='강좌 개설' icon={<IcBell />} />
    <IconButton title='강좌 찾기' icon={<IcSearch />} />
  </div>
);

export default Page;
