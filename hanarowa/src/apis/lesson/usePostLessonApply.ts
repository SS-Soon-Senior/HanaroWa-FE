import { TanstackQueryClient } from '../client';

const usePostLessonApply = () => {
  return TanstackQueryClient.useMutation('post', '/lesson/{lessonGisuId}');
};

export default usePostLessonApply;
