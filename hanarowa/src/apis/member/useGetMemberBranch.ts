import { TanstackQueryClient } from '@apis';

const useGetMemberBranch = () => {
  return TanstackQueryClient.useQuery('get', '/api/member/branch', {});
};

export default useGetMemberBranch;
