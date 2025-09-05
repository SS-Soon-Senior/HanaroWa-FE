import { Ic404 } from '@/assets/svg';
import { Layout } from '@components';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Layout className='flex flex-col items-center justify-center text-center'>
      <div className='mb-2'>
        <Ic404 />
      </div>
      <div className='font-bold-24 text-black'>페이지를 찾을 수 없습니다</div>
      <div className='font-medium-16 text-gray353 mt-1 mb-2'>
        입력하신 주소가 잘못되었거나
        <br />
        페이지가 삭제되었을 수 있습니다.
      </div>
      <Link
        href='/'
        className='bg-main font-medium-14 mt-4 inline-block w-fit rounded-lg px-5 py-3 text-white shadow-md'
      >
        메인으로 돌아가기
      </Link>
    </Layout>
  );
}
