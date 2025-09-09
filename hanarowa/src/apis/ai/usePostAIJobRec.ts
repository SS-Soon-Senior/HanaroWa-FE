import { TanstackQueryClient } from '../client';

const usePostAIJobRec = () => {
  return TanstackQueryClient.useMutation('post', '/api/ai/recommend-jobs');
};

export default usePostAIJobRec;
