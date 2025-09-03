import { client } from '@apis';
import { components } from '@/types/api';

type UpdateLessonDetailRequestDTO = components['schemas']['UpdateLessonDetailRequestDTO'];

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