import { TanstackQueryClient } from '@apis';

const useGetMyFacility = () => {
  return TanstackQueryClient.useQuery('get', '/facility/reservation');
};

export default useGetMyFacility;
