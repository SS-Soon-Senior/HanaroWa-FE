import { TanstackQueryClient } from '@apis';

const useGetBranch = () => {
  return TanstackQueryClient.useQuery('get', '/branch');
};

export default useGetBranch;
