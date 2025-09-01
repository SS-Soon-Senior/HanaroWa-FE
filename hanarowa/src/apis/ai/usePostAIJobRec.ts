import { TanstackQueryClient } from '../client';

const usePostAIJobRec = () => {
  return TanstackQueryClient.useMutation('post', '/ai/recommend-jobs');
};

export default usePostAIJobRec;
