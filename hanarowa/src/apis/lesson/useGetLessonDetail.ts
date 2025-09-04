'use server';

import { ServerComponentClient } from '../serverClient';

// const useGetLessonDetail = (lessonId: number) => {
//   return TanstackQueryClient.useQuery('get', `/lesson/{lessonId}`, {
//     params: { path: { lessonId } },
//   });
// };

// export default useGetLessonDetail;

const getLessonDetail = async (lessonId: number) => {
  const client = await ServerComponentClient();
  return client.GET(`/lesson/{lessonId}`, {
    params: { path: { lessonId } },
  });
};

export default getLessonDetail;
