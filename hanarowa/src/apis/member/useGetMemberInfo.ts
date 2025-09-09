import { TanstackQueryClient } from '@apis';

const useGetMemberInfo = () => {
  return TanstackQueryClient.useQuery('get', '/api/member', {});
};

export default useGetMemberInfo;
