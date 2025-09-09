import { TanstackQueryClient } from '@apis';

const useGetMyLesson = () => {
  return TanstackQueryClient.useQuery('get', '/api/lesson/reservation');
};

export default useGetMyLesson;
