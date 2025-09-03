'use client';

import { Header, Layout } from '@/components';
import AdminManageCard from '@/components/lesson/AdminManageCard';
import { components } from '@/types/api';
import { getManageLessons, updateLessonState } from '@apis';
import { useEffect, useState } from 'react';

type AdminManageLesson = components['schemas']['AdminManageLessonResponseDTO'];

const Page = () => {
  const [lessons, setLessons] = useState<AdminManageLesson[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchManageLessons = async () => {
    try {
      setLoading(true);
      const { data } = await getManageLessons();

      // 여러 가능한 응답 구조 확인
      let lessonData: AdminManageLesson[] = [];
      if (data) {
        if ('result' in data && Array.isArray(data.result)) {
          lessonData = data.result;
        } else if (Array.isArray(data)) {
          lessonData = data;
        }
      }

      console.log('파싱된 데이터:', lessonData); // 디버깅용
      setLessons(lessonData);
    } catch (error) {
      console.error('강좌 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManageLessons();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      // API 호출
      await updateLessonState(id, { lessonState: 'APPROVED' });
      console.log('승인:', id);

      // 목록 새로고침
      fetchManageLessons();
    } catch (error) {
      console.error('승인 실패:', error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      // API 호출
      await updateLessonState(id, { lessonState: 'REJECTED' });
      console.log('반려:', id);

      // 목록 새로고침
      fetchManageLessons();
    } catch (error) {
      console.error('반려 실패:', error);
    }
  };

  if (loading) {
    return (
      <Layout header={<Header title='강좌 신청 관리' />}>
        <div className='flex min-h-[20rem] items-center justify-center'>
          <p className='font-medium-16 text-gray4a9'>로딩 중...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout header={<Header title='강좌 신청 관리' />}>
      <div className='flex w-full flex-col gap-[2rem]'>
        {lessons.length === 0 ? (
          <div className='flex min-h-[20rem] items-center justify-center'>
            <p className='font-medium-16 text-gray4a9'>
              등록된 강좌가 없습니다.
            </p>
          </div>
        ) : (
          <div className='flex w-full flex-col gap-[1.2rem]'>
            {lessons.map((lesson) => (
              <AdminManageCard
                key={lesson.id || `lesson-${lessons.indexOf(lesson)}`}
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
