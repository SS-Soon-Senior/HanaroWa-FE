import { TanstackQueryClient } from '@apis';

const useLessonMember = (lessonGisuId: number) => {
  return TanstackQueryClient.useQuery(
    'get',
    '/admin/lesson/{lessonGisuId}/member',
    {
      params: {
        path: {
          lessonGisuId,
        },
      },
    }
  );
};

export default useLessonMember;
