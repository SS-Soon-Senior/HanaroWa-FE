import { TanstackQueryClient } from '@apis';

const useAdminGetMemberlist = () => {
  return TanstackQueryClient.useQuery('get', '/admin/member');
};

export default useAdminGetMemberlist;
