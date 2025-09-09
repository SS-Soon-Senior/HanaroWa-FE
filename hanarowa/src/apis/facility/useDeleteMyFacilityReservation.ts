import { TanstackQueryClient } from '../client';

const useDeleteMyFacilityReservation = () => {
  return TanstackQueryClient.useMutation(
    'delete',
    '/api/facility/{reservationId}',
    {
      onSuccess: () => {
        console.log('시설예약 취소 성공');
      },
      onError: (error) => {
        console.error('시설예약 취소 실패:', error);
      },
    }
  );
};

export default useDeleteMyFacilityReservation;
