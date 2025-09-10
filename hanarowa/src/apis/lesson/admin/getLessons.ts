'use server';

import { createServerClient } from '@/apis/serverClient';

const getLessons = async () => {
  const client = await createServerClient();
  return client.GET(`/api/admin/lesson`);
};

export default getLessons;
