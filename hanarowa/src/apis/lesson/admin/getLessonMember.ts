'use server';

import { createServerClient } from '@/apis/serverClient';

const getLessonMember = async (lessonGisuId: number) => {
  const client = await createServerClient();
  return client.GET('/api/admin/lesson/{lessonGisuId}/member', {
    params: { path: { lessonGisuId } },
  });
};

export default getLessonMember;
