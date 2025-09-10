'use client';

import useDeleteMyFacilityReservation from '@/apis/facility/useDeleteMyFacilityReservation';
import useGetMyFacility from '@/apis/facility/useGetMyFacility';
import {
  Header,
  Layout,
  StatusTag,
  RoomReservationCard,
  Modal,
} from '@/components';
import { useModal } from '@hooks';
import { useState } from 'react';

const Page = () => {
  const { data, refetch } = useGetMyFacility();
  const { mutate } = useDeleteMyFacilityReservation();
  const { isOpen, openModal, closeModal } = useModal();
  const [reservationId, setReservationId] = useState<number | null>(null);

  const reservations = data?.result?.filter((f) => !f.isUsed) ?? [];
  const completes = data?.result?.filter((f) => f.isUsed) ?? [];

  const onClickDelete = (reservationId: number | null) => {
    if (reservationId) {
      mutate(
        {
          params: { path: { reservationId } },
        },
        {
          onSuccess: () => {
            refetch();
            closeModal();
          },
        }
      );
    }
  };

  return (
    <Layout header={<Header title='내 예약 내역' />}>
      <div className='flex w-full flex-col gap-8 p-4'>
        {reservations.length === 0 && completes.length === 0 && (
          <div className='text-gray666 border-gray4a9 h-screen rounded-2xl py-80 text-center text-3xl'>
            예약 내역이 없습니다.
          </div>
        )}
        {/* 예약 중 섹션 */}
        {reservations.length > 0 && (
          <div className='space-y-4'>
            <StatusTag status='reservation' />
            {reservations.map((facility, index) => (
              <RoomReservationCard
                key={`reservation-${index}`}
                startedAt={facility.startedAt}
                reservedAt={facility.reservedAt}
                placeName={facility.branchName}
                facilityName={facility.facilityName}
                isUsed={false}
                onClick={() => {
                  setReservationId(facility.reservationId || 0);
                  openModal();
                }}
              />
            ))}
          </div>
        )}

        {reservations.length > 0 && completes.length > 0 && (
          <hr className='border-grayaaa space-y-4 border-t' />
        )}

        {/* 완료 섹션 */}
        {completes.length > 0 && (
          <div className='space-y-4'>
            <StatusTag status='complete' />
            {completes.map((facility, index) => (
              <RoomReservationCard
                key={`complete-${index}`}
                startedAt={facility.startedAt}
                reservedAt={facility.reservedAt}
                placeName={facility.branchName}
                facilityName={facility.facilityName}
                isUsed={true}
              />
            ))}
          </div>
        )}
      </div>

      {isOpen && (
        <Modal
          title='예약을 취소하시겠습니까?'
          description='취소는 되돌릴 수 없습니다.'
          greenButtonText='확인'
          onClickGreenButton={() => {
            onClickDelete(reservationId);
          }}
        />
      )}
    </Layout>
  );
};

export default Page;
