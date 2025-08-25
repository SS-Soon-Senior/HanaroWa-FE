'use client';

import { Header, Layout, StatusTag } from '@/components/atoms';
import { LessonReservationCard, StatusTab } from '@/components/lesson';
import { useState } from 'react';

const myLessons = [
  {
    lessonName: '최면 기초 완성',
    reserveHanDate: '2024.03.15',
    reservationDate: '4월 5일 (금) 오후 2:00',
    location: '종로구 문화센터 301호',
    instructor: '정소은',
    isReviewed: false,
    isInProgress: true,
  },
  {
    lessonName: '스마트폰 활용법 입문',
    reserveHanDate: '2024.03.15',
    reservationDate: '3월 20일 (수) 오전 10:00',
    location: '강남구 복지센터 강의실',
    instructor: '시코코',
    isReviewed: false,
    isInProgress: true,
  },
  {
    lessonName: '스마트폰 활용법 입문',
    reserveHanDate: '2024.03.15',
    reservationDate: '3월 20일 (수) 오전 10:00',
    location: '강남구 복지센터 강의실',
    instructor: '시코코',
    isReviewed: true,
    isInProgress: false,
  },
  {
    lessonName: '스마트폰 활용법 입문',
    reserveHanDate: '2024.03.15',
    reservationDate: '3월 20일 (수) 오전 10:00',
    location: '강남구 복지센터 강의실',
    instructor: 'test',
    isInProgress: true,
  },
  {
    lessonName: '스마트폰 활용법 입문',
    reserveHanDate: '2024.03.15',
    reservationDate: '3월 20일 (수) 오전 10:00',
    location: '강남구 복지센터 강의실',
    instructor: 'test',
    isInProgress: false,
  },
];

const tabs = [
  { key: 'applied', label: '수강 강좌' },
  { key: 'opened', label: '개설 강좌' },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState('applied');

  const currentUser = 'test'; // 임시 유저

  // 수강 강좌
  const appliedLessons = myLessons.filter((c) => c.instructor !== currentUser);
  const reservations = appliedLessons.filter((c) => c.isInProgress);
  const completes = appliedLessons.filter((c) => !c.isInProgress);

  // 개설 강좌
  const openedLessons = myLessons.filter((c) => c.instructor === currentUser);

  return (
    <Layout header={<Header title='내 강좌' />}>
      <div className='p-4'>
        <StatusTab
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* 수강 강좌 */}
      {activeTab === 'applied' && (
        <div className='flex flex-col gap-8 p-4'>
          {reservations.length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='inprogress' />
              {reservations.map((cls, idx) => (
                <LessonReservationCard
                  key={`reservation-${idx}`}
                  {...cls}
                  isOpened={false}
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
                  {...cls}
                  isOpened={false}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 개설 강좌 */}
      {activeTab === 'opened' && (
        <div className='flex flex-col gap-8 p-4'>
          {openedLessons.filter((c) => c.isInProgress).length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='teaching' />
              {openedLessons
                .filter((c) => c.isInProgress)
                .map((cls, idx) => (
                  <LessonReservationCard
                    key={`teaching-${idx}`}
                    {...cls}
                    isOpened
                  />
                ))}
            </div>
          )}

          {openedLessons.filter((c) => c.isInProgress).length > 0 &&
            openedLessons.filter((c) => !c.isInProgress).length > 0 && (
              <hr className='my-4 border-t border-gray-200' />
            )}

          {openedLessons.filter((c) => !c.isInProgress).length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='complete' />
              {openedLessons
                .filter((c) => !c.isInProgress)
                .map((cls, idx) => (
                  <LessonReservationCard
                    key={`complete-${idx}`}
                    {...cls}
                    isOpened
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
