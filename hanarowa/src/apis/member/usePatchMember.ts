import { TanstackQueryClient } from '../client';

export const useWithdrawMember = () => {
  return TanstackQueryClient.useMutation('patch', '/member/withdraw');
};

export const usePatchPassword = () => {
  return TanstackQueryClient.useMutation('patch', '/member/password');
};

export const useModifyInfo = () => {
  return TanstackQueryClient.useMutation('patch', '/member');
};
