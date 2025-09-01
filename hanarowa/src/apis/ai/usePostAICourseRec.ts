import { TanstackQueryClient } from '../client';

const usePostAiCourseRec = () => {
  return TanstackQueryClient.useMutation('post', '/ai/recommend-courses');
};

export default usePostAiCourseRec;
