import { TanstackQueryClient } from '@apis';

const usePostReserveFacility = () => {
  return TanstackQueryClient.useMutation('post', '/api/facility/reservation');
};

export default usePostReserveFacility;
