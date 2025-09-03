import { TanstackQueryClient } from '@apis';

const usePostLessonReview = () => {
  return TanstackQueryClient.useMutation(
    'post',
    '/lesson/{lessonGisuId}/review'
  );
};

export default usePostLessonReview;
