import { createServerClient } from './../serverClient';

const postLessonApply = async (lessonGisuId: number) => {
  const client = await createServerClient();
  return await client.POST(`/lesson/{lessonGisuId}`, {
    params: { path: { lessonGisuId } },
  });
};

export default postLessonApply;
