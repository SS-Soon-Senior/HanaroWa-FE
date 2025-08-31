'use client';

import useGetFacilityDetail from '@/apis/facility/useGetFacilityDetail';
import {
  Layout,
  Header,
  Button,
  FacilityImageCarousel,
  FacilityInfo,
  DateSelector,
  TimeSelector,
  ReservationSummary,
} from '@/components';
import { components } from '@/types/api';
import { useParams } from 'next/navigation';
import { useState } from 'react';

type Schedule = Record<string, string[]>;

type MemberRegistRequest = components['schemas']['FacilityDetailResponseDTO'];

const Page = () => {
  // 내일 날짜를 초기값으로 설정
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<string | null>(
    formatDate(tomorrow)
  );
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const facilityId = useParams<{ facilityId: string }>().facilityId;

  const { data, isLoading, isError } = useGetFacilityDetail(facilityId);

  const ImgSrc = [
    '/imgs/IMG_7675.png',
    '/imgs/cinemaroom.png',
    '/imgs/stardolilogo.png',
  ];

  // 로딩 중일 때
  if (isLoading) {
    return (
      <Layout>
        <div>로딩 중...</div>
      </Layout>
    );
  }

  // 에러가 발생했거나 데이터가 없을 때
  if (isError || !data?.result) {
    return (
      <Layout>
        <div>데이터를 불러오는 데 실패했습니다.</div>
      </Layout>
    );
  }

  const {
    facilityName = '시설 정보 없음',
    facilityDescription = '시설 설명 없음',
    facilityImages = [],
    facilityTimes = {},
  }: MemberRegistRequest = data.result;

  const bookedTimesForSelectedDate = selectedDate
    ? facilityTimes[selectedDate] || []
    : [];

  const handleDateSelect = (date: string): void => {
    setSelectedDate(date);
    setSelectedTimes([]);
  };

  const handleTimeSelect = (clickedTime: string): void => {
    const isAlreadySelected = selectedTimes.includes(clickedTime);
    let newSelection = [...selectedTimes];

    if (isAlreadySelected) {
      newSelection = newSelection.filter((t) => t !== clickedTime);
    } else {
      if (newSelection.length < 2) {
        newSelection.push(clickedTime);
      } else {
        newSelection = [clickedTime];
      }
    }

    newSelection.sort();
    if (newSelection.length === 2) {
      const firstHour = parseInt(newSelection[0].split(':')[0]);
      const secondHour = parseInt(newSelection[1].split(':')[0]);
      if (secondHour - firstHour !== 1) {
        newSelection = [clickedTime];
      }
    }
    setSelectedTimes(newSelection);
  };

  // 모레, 글피 날짜 생성 (내일은 이미 위에서 생성됨)
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const dates = [
    formatDate(tomorrow),
    formatDate(dayAfterTomorrow),
    formatDate(threeDaysLater),
  ];

  const times = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const sortedSelectedTimes = [...selectedTimes].sort();
  const startTime = sortedSelectedTimes[0];
  const duration = sortedSelectedTimes.length;
  const endTime = startTime
    ? `${parseInt(startTime.split(':')[0]) + duration}:00`
    : '';

  const toKoreanDate = (iso: string): string => {
    const [y, m, d] = iso.split('-');
    return `${y}년 ${parseInt(m, 10)}월 ${parseInt(d, 10)}일`;
  };

  return (
    <Layout header={<Header showBackButton={true} title='예약하기' />}>
      <FacilityImageCarousel
        // images={facilityImages.map((img) => img.imgUrl || '')}
        images={ImgSrc}
      />

      <FacilityInfo roomname={facilityName} roomtext={facilityDescription} />

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <TimeSelector
        times={times}
        selectedTimes={selectedTimes}
        bookedTimes={bookedTimesForSelectedDate}
        onTimeSelect={handleTimeSelect}
      />

      <ReservationSummary
        selectedDate={selectedDate}
        duration={duration}
        startTime={startTime}
        endTime={endTime}
        toKoreanDate={toKoreanDate}
      />

      <Button variant={duration === 0 ? 'disabled' : 'green'} sizeType='lg'>
        예약하기
      </Button>
    </Layout>
  );
};

export default Page;
