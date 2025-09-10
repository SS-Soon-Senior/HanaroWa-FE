import { TanstackQueryClient } from '../client';

export const useWithdrawMember = () => {
  return TanstackQueryClient.useMutation('patch', '/api/member/withdraw');
};

export const usePatchPassword = () => {
  return TanstackQueryClient.useMutation('patch', '/api/member/password');
};

export const useModifyInfo = () => {
  return TanstackQueryClient.useMutation('patch', '/api/member');
};
