import { TanstackQueryClient } from '../client';

const usePatchMember = () => {
  return TanstackQueryClient.useMutation('patch', '/member/withdraw');
};

export default usePatchMember;
