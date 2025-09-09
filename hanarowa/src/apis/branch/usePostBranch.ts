import { useQueryClient } from '@tanstack/react-query';
import { TanstackQueryClient } from '../client';

const usePostBranch = () => {
  const queryClient = useQueryClient();
  return TanstackQueryClient.useMutation(
    'post',
    `/api/member/branch/{branchId}`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['get', '/api/member/branch'],
        });
      },
      onError: (error) => {
        console.error('지점 선택 실패:', error);
      },
    }
  );
};

export default usePostBranch;
