import { TanstackQueryClient } from '@apis';

const usePostReserveFacility = () => {
  return TanstackQueryClient.useMutation('post', '/facility/reservation');
};

export default usePostReserveFacility;
