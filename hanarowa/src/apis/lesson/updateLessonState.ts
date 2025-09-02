import { client } from '@apis';
import { components } from '@/types/api';

type UpdateLessonStateRequest = components['schemas']['LessonGisuStateUpdateRequestDto'];

const updateLessonState = (lessonGisuId: number, data: UpdateLessonStateRequest) => {
  return client.PATCH('/admin/lesson/{lessonGisuId}/state', {
    params: {
      path: {
        lessonGisuId,
      },
    },
    body: data,
  });
};

export default updateLessonState;