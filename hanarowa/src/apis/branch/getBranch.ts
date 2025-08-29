import { client } from '@/apis/client';

const getBranch = async () => {
  const response = await client.GET('/branch');
  return response;
};

export default getBranch;
