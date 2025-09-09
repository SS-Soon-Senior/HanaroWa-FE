import { TanstackQueryClient } from '../client';

const usePostLessonApply = () => {
  return TanstackQueryClient.useMutation('post', '/api/lesson/{lessonGisuId}');
};

export default usePostLessonApply;
