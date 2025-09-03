import { TanstackQueryClient } from '@apis';

const useDeleteFacilityTime = () => {
  return TanstackQueryClient.useMutation(
    'delete',
    '/admin/facility/{reservationId}'
  );
};

export default useDeleteFacilityTime;
