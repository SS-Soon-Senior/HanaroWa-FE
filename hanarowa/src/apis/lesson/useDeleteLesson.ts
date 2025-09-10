import { toast } from 'sonner';
import { TanstackQueryClient } from '../client';

const useDeleteLesson = () => {
  return TanstackQueryClient.useMutation(
    'delete',
    '/api/lesson/{lessonGisuId}',
    {
      onSuccess: () => {},
      onError: (error) => {
        console.warn('강의 취소 실패:', error);
        toast.error('강의 취소에 실패했어요. 다시 시도해주세요.');
      },
    }
  );
};

export default useDeleteLesson;
