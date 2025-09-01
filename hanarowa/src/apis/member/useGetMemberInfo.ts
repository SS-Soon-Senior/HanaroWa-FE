import { TanstackQueryClient } from '@apis';

//클라이언트 컴포넌트에서 사용하는 경우

const useGetMemberInfo = () => {
  return TanstackQueryClient.useQuery('get', '/member', {});
};

export default useGetMemberInfo;
