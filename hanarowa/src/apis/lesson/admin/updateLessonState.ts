import { components } from '@/types/api';
import { client } from '@apis';

type UpdateLessonStateRequest =
  components['schemas']['LessonGisuStateUpdateRequestDto'];

const updateLessonState = (
  lessonGisuId: number,
  data: UpdateLessonStateRequest
) => {
  return client.PATCH('/api/admin/lesson/{lessonGisuId}/state', {
    params: {
      path: {
        lessonGisuId,
      },
    },
    body: data,
  });
};

export default updateLessonState;
