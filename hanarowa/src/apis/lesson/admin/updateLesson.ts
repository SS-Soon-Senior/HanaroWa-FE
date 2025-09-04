import { components } from '@/types/api';
import { client } from '@apis';

type UpdateLessonDetailRequestDTO =
  components['schemas']['UpdateLessonDetailRequestDTO'];

const updateLesson = (lessonId: string, data: UpdateLessonDetailRequestDTO) => {
  return client.PATCH('/admin/lesson/{lessonId}', {
    params: {
      path: {
        lessonId: parseInt(lessonId),
      },
    },
    body: data,
  });
};

export default updateLesson;
