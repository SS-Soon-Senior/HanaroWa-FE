import { toast } from 'sonner';
import { TanstackQueryClient } from '../client';

const usePostMemberInfo = () => {
  return TanstackQueryClient.useMutation('post', '/api/member/info', {
    onSuccess: () => {},
    onError: (error) => {
      console.warn('회원 정보 수정 실패:', error);
      toast.error('회원 정보 수정에 실패했어요. 다시 시도해주세요.');
    },
  });
};

export default usePostMemberInfo;
