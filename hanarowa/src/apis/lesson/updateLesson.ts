import { client } from '@apis';

const updateLesson = (lessonId: string, data: any) => {
  return client.PATCH('/admin/lesson/{lessonId}', {
    params: {
      path: {
        lessonId,
      },
    },
    body: data,
  });
};

export default updateLesson;