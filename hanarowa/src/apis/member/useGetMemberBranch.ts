import { TanstackQueryClient } from '@apis';

const useGetMemberBranch = () => {
  return TanstackQueryClient.useQuery('get', '/member/branch', {});
};

export default useGetMemberBranch;
