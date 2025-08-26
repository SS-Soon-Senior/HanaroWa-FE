'use client';

import {
  Button,
  ErrorMessage,
  Header,
  Layout,
  Textarea,
  StarRating,
} from '@/components';
import { useState } from 'react';

const Page = () => {
  const [starCount, setStarCount] = useState(0);
  const [reviewContent, setReviewContent] = useState('');

  const isFormValid = starCount > 0 && reviewContent.trim() !== '';
  const DivStyle = 'flex flex-col gap-[1.2rem]';

  // form 로직 필요

  return (
    <Layout header={<Header title='리뷰 작성하기' />}>
      <form className='flex w-full flex-1 flex-col'>
        <div className='mt-[1rem] flex w-full flex-col gap-[3rem]'>
          <div className={DivStyle}>
            <h1 className='font-medium-20 text-black'>별점</h1>
            <StarRating
              starCount={starCount}
              setStarCount={setStarCount}
              size={30}
            />
          </div>
          <div className={DivStyle}>
            <h1 className='font-medium-20 text-black'>리뷰 내용</h1>
            <Textarea
              placeholder='강좌를 듣고 느낀 부분을 자세히 작성해 주세요.'
              containerClassName='h-[22.5rem]'
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
          </div>
        </div>
        <div className='mx-auto mt-auto flex w-full flex-col items-center justify-center'>
          {!isFormValid && (
            <ErrorMessage align='text-center'>
              내용을 입력해주세요.
            </ErrorMessage>
          )}
          <Button
            variant={isFormValid ? 'green' : 'disabled'}
            sizeType='lg'
            className='mt-4'
            type='submit'
            disabled={!isFormValid}
          >
            작성완료
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Page;
