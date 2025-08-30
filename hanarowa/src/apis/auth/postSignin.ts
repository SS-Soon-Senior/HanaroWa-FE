import { client } from '@/apis/client';

const postSignin = async (data: { email: string; password: string }) => {
  return client.POST('/auth/signin', {
    body: data,
  });
};

export default postSignin;
