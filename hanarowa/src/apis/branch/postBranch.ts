import { client } from '@/apis/client';

const postBranch = async (branchId: number) => {
  const response = await client.POST('/member/branch/{branchId}', {
    params: { path: { branchId } },
  });
  return response;
};

export default postBranch;
