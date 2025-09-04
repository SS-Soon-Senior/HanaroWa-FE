'use client';

import useGetFilterLessonList from '@/apis/lesson/useGetFilterLessonList';
import { CategoryKey } from '@/constants/category';
import { components } from '@/types/api';
import { useGetMemberBranch } from '@apis';
import {
  Layout,
  Header,
  BranchFilter,
  CategoryFilter,
  LessonCard,
  BranchSelectModal,
} from '@components';
import { useModal } from '@hooks';
import { useState } from 'react';

type Branch = components['schemas']['BranchResponseDTO'];

const Page = () => {
  const branchResponse = useGetMemberBranch();
  const myBranch = branchResponse.data?.result;
  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(
    []
  );
  const [selectedBranch, setSelectedBranch] = useState<Branch>(
    myBranch ?? { branchId: 1, branchName: '', locationName: '' }
  );

  const handleCategoryChange = (categories: CategoryKey[]) => {
    setSelectedCategories(categories);
  };

  const { isOpen, openModal, closeModal } = useModal();

  const handleBranchChange = () => {
    openModal();
  };

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    closeModal();
  };

  const response = useGetFilterLessonList(selectedBranch.branchId || 1);
  if (!response?.isSuccess) {
    return null;
  }
  const lessons = response.result?.lessons ? response.result.lessons : [];

  return (
    <Layout header={<Header title='강좌 목록' showSearchButton />}>
      <BranchFilter
        branchName={selectedBranch.branchName || '지점 선택'}
        onChangeBranch={handleBranchChange}
      />
      <CategoryFilter
        selectedCategories={selectedCategories}
        onChange={handleCategoryChange}
      />
      <div className='grid w-full grid-cols-2 gap-[2.5rem]'>
        {lessons
          .filter((lesson) => {
            // 카테고리가 선택되지 않았으면 모든 강좌 표시
            if (selectedCategories.length === 0) {
              return true;
            }
            // 선택된 카테고리들 중 하나라도 일치하면 표시 (합집합)
            return selectedCategories.includes(lesson.lessonCategory!);
          })
          .map((lesson) => (
            <LessonCard key={lesson.lessonId} {...lesson} />
          ))}
      </div>
      <BranchSelectModal
        isOpen={isOpen}
        onClose={closeModal}
        onSelect={handleBranchSelect}
      />
    </Layout>
  );
};

export default Page;
