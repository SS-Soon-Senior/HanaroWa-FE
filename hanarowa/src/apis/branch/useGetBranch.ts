import { TanstackQueryClient } from '@apis';

//클라이언트 컴포넌트에서 사용하는 경우

const useGetBranch = () => {
  return TanstackQueryClient.useQuery('get', '/branch');
};

export default useGetBranch;
