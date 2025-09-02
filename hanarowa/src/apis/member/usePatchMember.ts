import { TanstackQueryClient } from '../client';

type ApiError = { code: string; message: string };

export const useWithdrawMember = () => {
  return TanstackQueryClient.useMutation('patch', '/member/withdraw');
};

export const usePatchPassword = () => {
  return TanstackQueryClient.useMutation('patch', '/member/password');
};
