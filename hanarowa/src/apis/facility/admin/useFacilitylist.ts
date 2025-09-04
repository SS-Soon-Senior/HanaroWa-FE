import { TanstackQueryClient } from '@apis';

const useFacilitylist = () => {
  return TanstackQueryClient.useQuery('get', '/admin/facility');
};

export default useFacilitylist;
