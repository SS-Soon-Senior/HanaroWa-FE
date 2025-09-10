'use client';

import { IcGraysearch } from '@/assets/svg';
import { Header, InputUnderline, Layout, LessonCard } from '@/components';
import { useGetSearchLessonList } from '@apis';
import { useDebounce } from '@hooks';
import { useState } from 'react';

const Page = () => {
  const [search, setSearch] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useDebounce(() => setSearchQuery(search), 500, [search]);

  const { data: lessons, isLoading } = useGetSearchLessonList(searchQuery);

  return (
    <Layout header={<Header title='강좌 목록' />}>
      <div className='w-full'>
        <InputUnderline
          placeholder='강좌를 검색해보세요'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className='absolute top-[10.5rem] right-[2.8rem] flex cursor-pointer'>
          <IcGraysearch />
        </div>
      </div>
      <div className='grid w-full grid-cols-2 gap-[2.5rem] pt-[2.5rem]'>
        {isLoading ? (
          <></>
        ) : (
          lessons?.result?.map(({ ...cardProps }, index) => (
            <LessonCard key={index} {...cardProps} />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Page;
