'use server';

import { createServerClient } from '../serverClient';

const getMemberBranch = async () => {
  const client = await createServerClient();
  return client.GET(`/api/member/branch`);
};

export default getMemberBranch;
