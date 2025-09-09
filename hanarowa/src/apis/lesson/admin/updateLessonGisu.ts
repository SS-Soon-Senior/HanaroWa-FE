import { components } from '@/types/api';
import { client } from '@apis';

type UpdateLessonGisuRequestDTO =
  components['schemas']['UpdateLessonGisuRequestDTO'];

const updateLessonGisu = (
  lessonGisuId: string,
  data: UpdateLessonGisuRequestDTO
) => {
  return client.PATCH('/api/admin/lesson/gisu/{lessonGisuId}', {
    params: {
      path: {
        lessonGisuId: parseInt(lessonGisuId),
      },
    },
    body: data,
  });
};

export default updateLessonGisu;
