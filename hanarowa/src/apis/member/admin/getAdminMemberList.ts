'use server';

import { createServerClient } from '../../serverClient';

const getAdminMemberList = async () => {
  const client = await createServerClient();
  return client.GET(`/api/admin/members`);
};

export default getAdminMemberList;
