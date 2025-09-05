'use client';

import useGetMyLesson from '@/apis/lesson/useGetMyLesson';
import {
  Header,
  Layout,
  StatusTag,
  LessonReservationCard,
  StatusTab,
} from '@/components';
import { useState } from 'react';

const tabs = [
  { key: 'applied', label: '수강 강좌' },
  { key: 'opened', label: '개설 강좌' },
];

const Page = () => {
  const { data, refetch } = useGetMyLesson();
  const [activeTab, setActiveTab] = useState('applied');

  const appliedLessons = data?.result?.lessonList || [];
  const openedLessons = data?.result?.myOpenLessonList || [];
  // 수강 강좌
  const reservations = appliedLessons.filter((c) => c.inProgress);
  const completes = appliedLessons.filter((c) => !c.inProgress);
  // 개설 강좌
  const openLessons = openedLessons.filter((c) => c.inProgress);
  const completeLessons = openedLessons.filter((c) => !c.inProgress);

  return (
    <Layout header={<Header title='내 강좌' />}>
      <StatusTab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 수강 강좌 */}
      {activeTab === 'applied' && (
        <div className='flex w-full flex-col gap-8 p-4'>
          {reservations.length === 0 && completes.length === 0 && (
            <div className='text-gray666 border-gray4a9 h-screen rounded-2xl py-80 text-center text-3xl'>
              수강 내역이 없습니다.
            </div>
          )}
          {reservations.length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='inprogress' />
              {reservations.map((cls, idx) => (
                <LessonReservationCard
                  key={`reservation-${idx}`}
                  refetch={refetch}
                  lessonGisuId={cls.lessonGisuId ?? 0}
                  lessonName={cls.lessonName ?? ''}
                  reserveHanDate={cls.startedAt ?? ''}
                  reservationDate={cls.reservedAt ?? ''}
                  location={cls.lessonRoomName ?? ''}
                  instructor={cls.instructorName ?? ''}
                  isReviewed={cls.reviewed ?? false}
                  isInProgress={cls.notStarted ?? false}
                  isOpened={!cls.inProgress}
                />
              ))}
            </div>
          )}

          {reservations.length > 0 && completes.length > 0 && (
            <hr className='my-4 border-t border-gray-200' />
          )}

          {completes.length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='complete' />
              {completes.map((cls, idx) => (
                <LessonReservationCard
                  key={`complete-${idx}`}
                  refetch={refetch}
                  lessonGisuId={cls.lessonGisuId ?? 0}
                  lessonName={cls.lessonName ?? ''}
                  reserveHanDate={cls.startedAt ?? ''}
                  reservationDate={cls.reservedAt ?? ''}
                  location={cls.lessonRoomName ?? ''}
                  instructor={cls.instructorName ?? ''}
                  isReviewed={cls.reviewed ?? false}
                  isInProgress={cls.notStarted ?? false}
                  isOpened={cls.inProgress ?? false}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 개설 강좌 */}
      {activeTab === 'opened' && (
        <div className='flex w-full flex-col gap-8 p-4'>
          {openLessons.length === 0 && completeLessons.length === 0 && (
            <div className='text-gray666 border-gray4a9 h-screen rounded-2xl py-80 text-center text-3xl'>
              개설 내역이 없습니다.
            </div>
          )}
          {openLessons.length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='teaching' />
              {openLessons.map((cls, idx) => (
                <LessonReservationCard
                  key={`teaching-${idx}`}
                  refetch={refetch}
                  lessonGisuId={cls.lessonGisuId ?? 0}
                  lessonName={cls.lessonName ?? ''}
                  reserveHanDate={cls.openedAt ?? ''}
                  reservationDate={cls.startedAt ?? ''}
                  location={cls.lessonRoomName ?? ''}
                  instructor={cls.instructorName ?? ''}
                />
              ))}
            </div>
          )}

          {openLessons.length > 0 && completeLessons.length > 0 && (
            <hr className='my-4 border-t border-gray-200' />
          )}

          {completeLessons.length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='complete' />
              {completeLessons.map((cls, idx) => (
                <LessonReservationCard
                  key={`complete-${idx}`}
                  refetch={refetch}
                  lessonGisuId={cls.lessonGisuId ?? 0}
                  lessonName={cls.lessonName ?? ''}
                  reserveHanDate={cls.openedAt ?? ''}
                  reservationDate={cls.startedAt ?? ''}
                  location={cls.lessonRoomName ?? ''}
                  instructor={cls.instructorName ?? ''}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Page;
