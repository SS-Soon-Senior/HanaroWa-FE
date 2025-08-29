import { TanstackQueryClient } from '@apis';

const getBranch = () => {
  return TanstackQueryClient.useQuery('get', '/branch');
};

export default getBranch;
