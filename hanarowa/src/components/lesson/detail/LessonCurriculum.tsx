'use client';

import { IcDownChevron } from '@/assets/svg';
import { Button } from '@/components/atoms';
import { components } from '@/types/api';
import { cn } from '@/utils/utils';
import { useState } from 'react';

const LessonCurriculum = ({
  curriculum,
}: {
  curriculum: components['schemas']['CurriculumResponseDTO'][];
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='flex w-full flex-col gap-[2rem] py-[2.5rem]'>
      <p className='font-bold-22 text-black'>커리큘럼</p>
      <div className='flex flex-col gap-[1.2rem]'>
        {curriculum.map((item, index) => (
          <div
            key={index}
            className={cn(
              'rounded-8 flex gap-[2rem] border-[0.1rem] border-[#D2E8E4] bg-[#E5F5F1] px-[1.6rem] py-[1.6rem]',
              expanded || index < 3 ? '' : 'hidden'
            )}
          >
            <p className='font-bold-18 text-black'>{`${index + 1}회차`}</p>
            <p className='font-bold-18 text-black'>{item.content}</p>
          </div>
        ))}

        {curriculum.length > 2 && (
          <Button
            onClick={() => setExpanded(!expanded)}
            className='font-bold-18 text-main flex h-fit rounded-[0.8rem] border-[0.1rem] border-[#D2E8E4] bg-[#E5F5F1] px-[1.6rem] py-[1.4rem]'
          >
            전체 커리큘럼 보기
            <IcDownChevron
              width={20}
              height={20}
              className={cn({ 'rotate-180': expanded })}
            />
          </Button>
        )}
      </div>
    </div>
  );
};
export default LessonCurriculum;
