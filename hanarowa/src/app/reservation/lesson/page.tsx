'use client';

import useGetMyLesson from '@/apis/lesson/useGetMyLesson';
import {
  Header,
  Layout,
  StatusTag,
  LessonReservationCard,
  StatusTab,
  StatusDropdown,
} from '@/components';
import { StatusValue } from '@/components/atoms/dropdown/StatusDropdown';
import { useState } from 'react';

const tabs = [
  { key: 'applied', label: '수강 강좌' },
  { key: 'opened', label: '개설 강좌' },
];

const Page = () => {
  const { data, refetch } = useGetMyLesson();
  const [activeTab, setActiveTab] = useState('applied');
  const [selectedStatus, setSelectedStatus] = useState<StatusValue>('APPROVED');

  const appliedLessons = data?.result?.lessonList || [];
  const openedLessons = data?.result?.myOpenLessonList || [];
  // 수강 강좌
  const reservations = appliedLessons.filter((c) => c.inProgress);
  const completes = appliedLessons.filter((c) => !c.inProgress);

  const { approvedLessons, pendingLessons, rejectedLessons } = (
    openedLessons || []
  ).reduce(
    (acc, c) => {
      switch (c.lessonState) {
        case 'APPROVED':
          acc.approvedLessons.push(c);
          break;
        case 'PENDING':
          acc.pendingLessons.push(c);
          break;
        case 'REJECTED':
          acc.rejectedLessons.push(c);
          break;
      }
      return acc;
    },
    {
      approvedLessons: [] as typeof openedLessons,
      pendingLessons: [] as typeof openedLessons,
      rejectedLessons: [] as typeof openedLessons,
    }
  );

  const filteredLessons =
    selectedStatus === 'APPROVED'
      ? approvedLessons
      : selectedStatus === 'PENDING'
        ? pendingLessons
        : rejectedLessons;

  return (
    <Layout header={<Header title='내 강좌' backUrl='/' />}>
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

      <div className='flex w-full justify-end px-4'>
        <StatusDropdown
          value={selectedStatus}
          onChange={(v) => setSelectedStatus(v)}
        />
      </div>

      {/* 개설 강좌 */}
      {activeTab === 'opened' && (
        <div className='flex w-full flex-col gap-8 p-4'>
          {openedLessons.length === 0 && (
            <div className='text-gray666 border-gray4a9 h-screen rounded-2xl py-80 text-center text-3xl'>
              개설 내역이 없습니다.
            </div>
          )}

          {filteredLessons.length > 0 && (
            <div className='space-y-4'>
              {filteredLessons.map((cls, idx) => (
                <LessonReservationCard
                  key={`selectedStatus-${idx}`}
                  refetch={refetch}
                  lessonGisuId={cls.lessonGisuId ?? 0}
                  lessonName={cls.lessonName ?? ''}
                  reserveHanDate={cls.openedAt ?? ''}
                  reservationDate={cls.startedAt ?? ''}
                  location={cls.lessonRoomName ?? ''}
                  isInProgress={cls.inProgress}
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
