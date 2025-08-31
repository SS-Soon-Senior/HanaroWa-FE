import { useQueryClient } from '@tanstack/react-query';
import { TanstackQueryClient } from '../client';

const usePostLesson = () => {
  const queryClient = useQueryClient();

  return TanstackQueryClient.useMutation('post', '/lesson/create', {
    onSuccess: () => {
      console.log('강좌 개설 성공');

      // 강좌 목록을 다시 불러와서 화면을 갱신
      queryClient.invalidateQueries({ queryKey: ['lesson', 'list'] });
    },
    onError: (error) => {
      console.error('강좌 개설 실패:', error);
    },
  });
};

export default usePostLesson;
