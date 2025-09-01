'use client';

import { CategoryKey } from '@/constants/category';
import { Lessons } from '@/data/lessons';
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

  return (
    <Layout header={<Header title='강좌 목록' showSearchButton />}>
      <BranchFilter branchName={myBranch.branchName} />
      <CategoryFilter
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
      />
      <div className='grid w-full grid-cols-2 gap-[2.5rem]'>
        {Lessons.map(({ id, ...cardProps }) => (
          <LessonCard key={id} {...cardProps} />
        ))}
      </div>
    </Layout>
  );
};

export default Page;
