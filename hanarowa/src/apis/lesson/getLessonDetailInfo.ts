'use server';

import { createServerClient } from '../serverClient';

const getLessonDetailInfo = async (lessonId: number) => {
  const client = await createServerClient();
  return client.GET(`/lesson/{lessonId}`, {
    params: { path: { lessonId } },
  });
};

export default getLessonDetailInfo;
