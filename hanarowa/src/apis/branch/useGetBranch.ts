import { TanstackQueryClient } from '@apis';

const useGetBranch = () => {
  return TanstackQueryClient.useQuery('get', '/api/branch');
};

export default useGetBranch;
