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
  const { data } = useGetMyLesson();
  const [activeTab, setActiveTab] = useState('applied');

  const appliedLessons = data?.result?.lessonList || [];
  const openedLessons = data?.result?.myOpenLessonList || [];
  // 수강 강좌
  const reservations = appliedLessons.filter((c) => c.inProgress);
  const completes = appliedLessons.filter((c) => !c.inProgress);

  return (
    <Layout header={<Header title='내 강좌' />}>
      <StatusTab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 수강 강좌 */}
      {activeTab === 'applied' && (
        <div className='flex w-full flex-col gap-8 p-4'>
          {reservations.length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='inprogress' />
              {reservations.map((cls, idx) => (
                <LessonReservationCard
                  key={`reservation-${idx}`}
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
          {openedLessons.filter((c) => c.inProgress).length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='teaching' />
              {openedLessons
                .filter((c) => c.inProgress)
                .map((cls, idx) => (
                  <LessonReservationCard
                    key={`teaching-${idx}`}
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

          {openedLessons.filter((c) => c.inProgress).length > 0 &&
            openedLessons.filter((c) => !c.inProgress).length > 0 && (
              <hr className='my-4 border-t border-gray-200' />
            )}

          {openedLessons.filter((c) => !c.inProgress).length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='complete' />
              {openedLessons
                .filter((c) => !c.inProgress)
                .map((cls, idx) => (
                  <LessonReservationCard
                    key={`complete-${idx}`}
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
