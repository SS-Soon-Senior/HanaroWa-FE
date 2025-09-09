import { TanstackQueryClient } from '@apis';

const useDeleteFacilityTime = () => {
  return TanstackQueryClient.useMutation(
    'delete',
    '/api/admin/facility/{reservationId}'
  );
};

export default useDeleteFacilityTime;
