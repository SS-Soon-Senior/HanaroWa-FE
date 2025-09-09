import { TanstackQueryClient } from '../client';

const usePostMemberInfo = () => {
  return TanstackQueryClient.useMutation('post', '/api/member/info', {
    onSuccess: () => {
      console.log('회원 정보 수정 성공');
    },
    onError: (error) => {
      console.error('회원 정보 수정 실패:', error);
    },
  });
};

export default usePostMemberInfo;
