import { client } from '@/apis/client';

const postBranch = (branchId: number) => {
  const response = client.POST('/member/branch/{branchId}', {
    params: { path: { branchId } },
  });
  return response;
};

export default postBranch;
