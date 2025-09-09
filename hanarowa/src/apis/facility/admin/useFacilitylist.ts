import { TanstackQueryClient } from '@apis';

const useFacilitylist = () => {
  return TanstackQueryClient.useQuery('get', '/api/admin/facility');
};

export default useFacilitylist;
