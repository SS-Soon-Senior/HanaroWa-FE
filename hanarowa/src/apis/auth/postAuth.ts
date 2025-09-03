import { client } from '@/apis/client';

export const postSignin = async (data: { email: string; password: string }) => {
  return client.POST('/auth/signin', {
    body: data,
  });
};

export const postSignup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return client.POST('/auth/signup', {
    body: data,
  });
};
