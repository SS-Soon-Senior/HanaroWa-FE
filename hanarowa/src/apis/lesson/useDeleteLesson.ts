import { TanstackQueryClient } from '../client';

const useDeleteLesson = () => {
  return TanstackQueryClient.useMutation(
    'delete',
    '/api/lesson/{lessonGisuId}',
    {
      onSuccess: () => {
        console.log('강의 취소 성공');
      },
      onError: (error) => {
        console.error('강의 취소 실패:', error);
      },
    }
  );
};

export default useDeleteLesson;
