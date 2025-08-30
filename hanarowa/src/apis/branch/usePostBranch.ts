import { useQueryClient } from '@tanstack/react-query';
import { TanstackQueryClient } from '../client';

const usePostBranch = () => {
  // const queryClient = useQueryClient();
  return TanstackQueryClient.useMutation('post', '/member/branch/{branchId}', {
    onSuccess: () => {
      console.log('지점 선택 성공');

      // 예시: 지점 선택 후 사용자 정보를 다시 불러와서 화면을 갱신하고 싶을 때
      // queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
    onError: (error) => {
      console.error('지점 선택 실패:', error);
    },
  });
};

export default usePostBranch;
