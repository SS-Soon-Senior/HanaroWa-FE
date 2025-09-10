import { TanstackQueryClient } from '@apis';

const useGetMyFacility = () => {
  return TanstackQueryClient.useQuery('get', '/api/facility/reservation');
};

export default useGetMyFacility;
