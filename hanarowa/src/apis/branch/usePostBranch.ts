import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
        console.warn(error);
        toast.error('지점 선택에 실패했어요. 다시 시도해주세요.');
      },
    }
  );
};

export default usePostBranch;
