import { client } from '../client';

const getLessonDetail = (lessonId: number) => {
  return client.GET(`/lesson/{lessonId}`, { params: { path: { lessonId } } });
};

export default getLessonDetail;
