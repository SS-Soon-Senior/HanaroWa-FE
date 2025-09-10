import { toast } from 'sonner';
import { TanstackQueryClient } from '../client';

const useDeleteMyFacilityReservation = () => {
  return TanstackQueryClient.useMutation(
    'delete',
    '/api/facility/{reservationId}',
    {
      onSuccess: () => {},
      onError: (error) => {
        console.warn(error);
        toast.error('예약 취소에 실패했어요. 다시 시도해주세요.');
      },
    }
  );
};

export default useDeleteMyFacilityReservation;
