'use client';

import { useGetFacilityDetail, usePostReserveFacility } from '@/apis/facility';
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
import createFacilityDate from '@/utils/facility';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

type FacilityDetailResponse =
  components['schemas']['FacilityDetailResponseDTO'];
export type FacilityReservation =
  components['schemas']['FacilityReservationDTO'];
const TIMES = [
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
const Page = () => {
  const { formatDate, tomorrow, today } = createFacilityDate();

  const facilityId = useParams<{ facilityId: string }>().facilityId;

  const router = useRouter();
  const { data, isLoading, isError } = useGetFacilityDetail(facilityId);
  const { mutate } = usePostReserveFacility();
  const [selectedDate, setSelectedDate] = useState<string | null>(
    formatDate(tomorrow)
  );
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  if (isLoading) {
    return (
      <Layout>
        <div>로딩 중...</div>
      </Layout>
    );
  }

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
  }: FacilityDetailResponse = data.result;

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

  // 모레, 글피 날짜 생성
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  const dates = [
    formatDate(tomorrow),
    formatDate(dayAfterTomorrow),
    formatDate(threeDaysLater),
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

  const handleSubmit = () => {
    if (!selectedDate || selectedTimes.length === 0 || !facilityId) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }
    mutate(
      {
        body: {
          facilityId: Number(facilityId),
          reservationDate: selectedDate,
          startTime: startTime,
          endTime: endTime,
        },
      },
      {
        onSuccess: () => {
          console.log('시설 예약 성공');
          router.push('/');
        },
        onError: (error) => {
          console.error('시설 예약 실패:', error);
        },
      }
    );
  };

  return (
    <Layout header={<Header showBackButton={true} title='예약하기' />}>
      <FacilityImageCarousel
        images={facilityImages.map((img) => img.imgUrl || '')}
      />

      <FacilityInfo roomname={facilityName} roomtext={facilityDescription} />

      <DateSelector
        dates={dates}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />

      <TimeSelector
        times={TIMES}
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

      <Button
        variant={duration === 0 ? 'disabled' : 'green'}
        sizeType='lg'
        onClick={handleSubmit}
      >
        예약하기
      </Button>
    </Layout>
  );
};

export default Page;
