'use client';

import { Modal, RoomReservationCard, StatusTag } from '@/components';
import { components } from '@/types/api';
import { useDeleteFacilityTime, useFacilitylist } from '@apis';
import { useModal } from '@hooks';
import { useMemo, useState } from 'react';

type Reservation = components['schemas']['AdminFacilityResponseDTO'];

const AdminFacilitySection = () => {
  const { data, refetch } = useFacilitylist();
  const { mutate } = useDeleteFacilityTime();
  const { isOpen, openModal, closeModal } = useModal();

  const [reservationId, setReservationId] = useState<number | null>(null);

  const dto: Reservation[] = useMemo(() => data?.result ?? [], [data?.result]);

  const { used, notUsed } = useMemo(() => {
    return dto.reduce(
      (acc, d) => {
        (d?.isUsed ? acc.used : acc.notUsed).push(d);
        return acc;
      },
      { used: [] as Reservation[], notUsed: [] as Reservation[] }
    );
  }, [dto]);

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
    <div className='flex w-full flex-col gap-[1.8rem]'>
      <div>
        <StatusTag status='reservation' />
      </div>
      {notUsed?.map((d) => (
        <RoomReservationCard
          key={`notUsed-${d.reservationId ?? `${d.branchName}-${d.startedAt}`}`}
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
      {used?.map((d) => (
        <RoomReservationCard
          key={`used-${d.reservationId ?? `${d.branchName}-${d.startedAt}`}`}
          startedAt={d.startedAt}
          reservedAt={d.reservedAt}
          placeName={d.branchName}
          userName={d.memberName}
          facilityName={d.facilityName}
          isUsed={true}
        />
      ))}

      {isOpen && (
        <Modal
          title='회원의 예약을 취소하시겠습니까?'
          description='회원에게 미리 고지를 해주세요'
          greenButtonText='확인'
          grayButtonText='취소'
          onClickGreenButton={() => {
            onClickDelete(reservationId);
          }}
          onClickGrayButton={() => {
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default AdminFacilitySection;
