import { TanstackQueryClient } from '../client';

const useGetLessonDetail = (lessonId: number) => {
  return TanstackQueryClient.useQuery('get', `/lesson/{lessonId}`, {
    params: { path: { lessonId } },
  });
};

export default useGetLessonDetail;
