import { TanstackQueryClient } from '@apis';

const usePostLessonReview = () => {
  return TanstackQueryClient.useMutation(
    'post',
    '/api/lesson/{lessonGisuId}/review'
  );
};

export default usePostLessonReview;
