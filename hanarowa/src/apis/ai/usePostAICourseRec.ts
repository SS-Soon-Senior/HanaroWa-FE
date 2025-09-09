import { TanstackQueryClient } from '../client';

const usePostAiCourseRec = () => {
  return TanstackQueryClient.useMutation('post', '/api/ai/recommend-courses');
};

export default usePostAiCourseRec;
