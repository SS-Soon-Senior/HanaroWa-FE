'use client';

import { Header, Layout, AdminManageCard } from '@/components';
import { components } from '@/types/api';
import { getManageLessons, updateLessonState } from '@apis';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type AdminManageLesson = components['schemas']['AdminManageLessonResponseDTO'];

const Page = () => {
  const [lessons, setLessons] = useState<AdminManageLesson[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isFetchingRef = useRef<boolean>(false);

  const fetchManageLessons = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setErrorMessage(null);
    try {
      setLoading(true);
      const { data } = await getManageLessons();

      const parsed: AdminManageLesson[] = Array.isArray(
        data as unknown as AdminManageLesson[]
      )
        ? (data as unknown as AdminManageLesson[])
        : data &&
            typeof data === 'object' &&
            Array.isArray((data as { result?: AdminManageLesson[] }).result)
          ? (data as { result: AdminManageLesson[] }).result
          : [];

      setLessons(parsed);
    } catch {
      setErrorMessage(
        '강좌 목록 조회에 실패했습니다. 잠시 후 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchManageLessons();
  }, [fetchManageLessons]);

  const handleApprove = useCallback(
    async (id: number) => {
      try {
        await updateLessonState(id, { lessonState: 'APPROVED' });
        await fetchManageLessons();
      } catch {
        setErrorMessage('승인 요청에 실패했습니다. 다시 시도해주세요.');
      }
    },
    [fetchManageLessons]
  );

  const handleReject = useCallback(
    async (id: number) => {
      try {
        await updateLessonState(id, { lessonState: 'REJECTED' });
        await fetchManageLessons();
      } catch {
        setErrorMessage('반려 요청에 실패했습니다. 다시 시도해주세요.');
      }
    },
    [fetchManageLessons]
  );

  const isEmpty = useMemo(
    () => !loading && lessons.length === 0,
    [loading, lessons]
  );

  return (
    <Layout header={<Header title='강좌 신청 관리' />}>
      <div className='flex w-full flex-col gap-[2rem]'>
        {errorMessage && (
          <div className='rounded-[0.8rem] bg-red-50 px-[1.2rem] py-[0.8rem]'>
            <p className='font-medium-14 text-red-500'>{errorMessage}</p>
          </div>
        )}

        {loading && (
          <div className='flex min-h-[20rem] items-center justify-center'>
            <p className='font-medium-16 text-gray4a9'>로딩 중...</p>
          </div>
        )}

        {isEmpty && (
          <div className='flex min-h-[20rem] items-center justify-center'>
            <p className='font-medium-16 text-gray4a9'>
              등록된 강좌가 없습니다.
            </p>
          </div>
        )}

        {!loading && lessons.length > 0 && (
          <div className='flex w-full flex-col gap-[1.2rem]'>
            {lessons.map((lesson) => (
              <AdminManageCard
                key={lesson.id}
                {...lesson}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Page;
