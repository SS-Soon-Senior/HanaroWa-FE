'use client';

import useGetFilterLessonList from '@/apis/lesson/useGetFilterLessonList';
import { CategoryKey } from '@/constants/category';
import {
  Layout,
  Header,
  BranchFilter,
  CategoryFilter,
  LessonCard,
} from '@components';
import { useBranch } from '@hooks';
import { useState } from 'react';

const Page = () => {
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(
    []
  );
  const { myBranch } = useBranch();

  const handleCategoryChange = (categories: CategoryKey[]) => {
    setSelectedCategories(categories);
  };

  const response = useGetFilterLessonList(1, ['DIGITAL']);
  if (!response?.isSuccess) {
    return null;
  }
  const lessons = response.result?.lessons ? response.result.lessons : [];

  return (
    <Layout header={<Header title='강좌 목록' showSearchButton />}>
      <BranchFilter branchName={myBranch.branchName} />
      <CategoryFilter
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
      />
      <div className='grid w-full grid-cols-2 gap-[2.5rem]'>
        {lessons.map(({ lessonId, ...cardProps }) => (
          <LessonCard key={lessonId} {...cardProps} />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
