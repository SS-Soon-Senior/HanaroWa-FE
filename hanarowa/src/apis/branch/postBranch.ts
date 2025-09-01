import { TanstackQueryClient } from '../client';

const postBranch = () => {
  return TanstackQueryClient.useMutation('post', `/member/branch/{branchId}`, {
    onSuccess: () => {
      console.log('지점 선택 성공');
    },
    onError: (error) => {
      console.error('지점 선택 실패:', error);
    },
  });
};

export default postBranch;
