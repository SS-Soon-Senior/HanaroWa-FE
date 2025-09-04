'use client';

import { CategoryKey } from '@/constants/category';
import { components } from '@/types/api';
import { useGetMemberBranch, useGetFilterLessonList } from '@apis';
import {
  BranchFilter,
  CategoryFilter,
  LessonCard,
  BranchSelectModal,
} from '@components';
import { useModal } from '@hooks';
import { useState, useEffect } from 'react';

type Branch = components['schemas']['BranchResponseDTO'];

const LessonContent = () => {
  const { data: branchData } = useGetMemberBranch();
  const myBranch = branchData?.result;

  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(
    []
  );
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  useEffect(() => {
    if (myBranch) {
      setSelectedBranch(myBranch);
    }
  }, [myBranch]);

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
  const response = useGetFilterLessonList(selectedBranch?.branchId ?? 1);

  if (!selectedBranch) {
    return <div>지점을 불러오는 중입니다...</div>;
  }

  const lessons = response?.result?.lessons || [];

  return (
    <>
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
            if (selectedCategories.length === 0) return true;
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
    </>
  );
};

export default LessonContent;
