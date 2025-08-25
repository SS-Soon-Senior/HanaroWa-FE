'use client';

import { Header, Layout, StatusTag } from '@/components/atoms';
import { StatusTab } from '@/components/lesson';
import ClassReservationCard from '@/components/lesson/ClassReservationCard';
import { useState } from 'react';

const myClasses = [
  {
    courseName: '최면 기초 완성',
    reserveHanDate: '2024.03.15',
    reservationDate: '4월 5일 (금) 오후 2:00',
    location: '종로구 문화센터 301호',
    instructor: '정소은',
    isReviewed: false,
    isInProgress: true,
  },
  {
    courseName: '스마트폰 활용법 입문',
    reserveHanDate: '2024.03.15',
    reservationDate: '3월 20일 (수) 오전 10:00',
    location: '강남구 복지센터 강의실',
    instructor: '시코코',
    isReviewed: false,
    isInProgress: true,
  },
  {
    courseName: '스마트폰 활용법 입문',
    reserveHanDate: '2024.03.15',
    reservationDate: '3월 20일 (수) 오전 10:00',
    location: '강남구 복지센터 강의실',
    instructor: '시코코',
    isReviewed: true,
    isInProgress: false,
  },
  {
    courseName: '스마트폰 활용법 입문',
    reserveHanDate: '2024.03.15',
    reservationDate: '3월 20일 (수) 오전 10:00',
    location: '강남구 복지센터 강의실',
    instructor: 'test',
    isInProgress: true,
  },
  {
    courseName: '스마트폰 활용법 입문',
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
  const appliedClasses = myClasses.filter((c) => c.instructor !== currentUser);
  const reservations = appliedClasses.filter((c) => c.isInProgress);
  const completes = appliedClasses.filter((c) => !c.isInProgress);

  // 개설 강좌
  const openedClasses = myClasses.filter((c) => c.instructor === currentUser);

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
                <ClassReservationCard
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
                <ClassReservationCard
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
          {openedClasses.filter((c) => c.isInProgress).length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='teaching' />
              {openedClasses
                .filter((c) => c.isInProgress)
                .map((cls, idx) => (
                  <ClassReservationCard
                    key={`teaching-${idx}`}
                    {...cls}
                    isOpened
                  />
                ))}
            </div>
          )}

          {openedClasses.filter((c) => c.isInProgress).length > 0 &&
            openedClasses.filter((c) => !c.isInProgress).length > 0 && (
              <hr className='my-4 border-t border-gray-200' />
            )}

          {openedClasses.filter((c) => !c.isInProgress).length > 0 && (
            <div className='space-y-4'>
              <StatusTag status='complete' />
              {openedClasses
                .filter((c) => !c.isInProgress)
                .map((cls, idx) => (
                  <ClassReservationCard
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
