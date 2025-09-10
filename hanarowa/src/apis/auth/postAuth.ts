import { TanstackQueryClient, client } from '@apis';

export const postSignin = async (data: { email: string; password: string }) => {
  return client.POST('/api/auth/signin', {
    body: data,
  });
};

export const postSignup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return client.POST('/api/auth/signup', {
    body: data,
  });
};

export const usePostSignOut = () => {
  return TanstackQueryClient.useMutation('post', '/api/auth/signout');
};
