import { client, TanstackQueryClient } from '@apis';

const useGetMyLesson = () => {
  return TanstackQueryClient.useQuery('get', '/lesson/reservation');
};

export default useGetMyLesson;
