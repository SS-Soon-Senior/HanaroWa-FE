'use server';

import { createServerClient } from '@/apis/serverClient';

const useAdminGetMemberlist = async () => {
  const client = await createServerClient();
  return client.GET(`/api/admin/member`);
};

export default useAdminGetMemberlist;
