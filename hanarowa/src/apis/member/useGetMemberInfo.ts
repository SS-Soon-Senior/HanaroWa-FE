import { TanstackQueryClient } from '@apis';

const useGetMemberInfo = () => {
  return TanstackQueryClient.useQuery('get', '/member', {});
};

export default useGetMemberInfo;
