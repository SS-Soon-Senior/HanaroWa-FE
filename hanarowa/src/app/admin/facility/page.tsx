'use client';

import { useDeleteFacilityTime, useFacilitylist } from '@/apis/facility';
import {
  Header,
  Layout,
  Modal,
  RoomReservationCard,
  StatusTag,
} from '@/components';
import { useModal } from '@hooks';
import { useState } from 'react';

type Reservation = {
  reservationId?: number;
  facilityName?: string;
  memberName?: string;
  branchName?: string;
  startedAt?: string;
  reservedAt?: string;
  isUsed?: boolean;
};

const Page = () => {
  const { data, refetch } = useFacilitylist();
  const { mutate } = useDeleteFacilityTime();
  const { isOpen, openModal, closeModal } = useModal();

  const [reservationId, setReservationId] = useState<number | null>(null);

  const dto: Reservation[] = data?.result ?? [];

  const { used, notUsed } = dto.reduce(
    (acc, d) => {
      (d?.isUsed ? acc.used : acc.notUsed).push(d);
      return acc;
    },
    { used: [] as Reservation[], notUsed: [] as Reservation[] }
  );

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
    <Layout header={<Header title='시설 예약 목록' />}>
      <div className='flex w-full flex-col gap-[1.8rem]'>
        <div>
          <StatusTag status='reservation' />
        </div>
        {notUsed?.map((d, i) => (
          <RoomReservationCard
            key={`notUsed-${i}`}
            startedAt={d.startedAt}
            reservedAt={d.reservedAt}
            placeName={d.branchName}
            userName={d.memberName}
            facilityName={d.facilityName}
            isUsed={false}
            onClick={() => {
              setReservationId(d.reservationId || 0);
              openModal();
            }}
          />
        ))}
        <hr className='border-gray7eb' />
        <div>
          <StatusTag status='complete' />
        </div>
        {used?.map((d, i) => (
          <RoomReservationCard
            key={`used-${i}`}
            startedAt={d.startedAt}
            reservedAt={d.reservedAt}
            placeName={d.branchName}
            userName={d.memberName}
            facilityName={d.facilityName}
            isUsed={true}
          />
        ))}
      </div>

      {isOpen && (
        <Modal
          title='회원의 예약을 취소하시겠습니까?'
          description='회원에게 미리 고지를 해주세요'
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
