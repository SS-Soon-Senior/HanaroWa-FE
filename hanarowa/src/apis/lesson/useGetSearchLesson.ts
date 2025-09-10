import { TanstackQueryClient } from '@apis';

const useGetSearchLessonList = (search: string | undefined) => {
  return TanstackQueryClient.useQuery('get', '/api/lesson/list', {
    params: {
      query: {
        query: search,
      },
    },
  });
};

export default useGetSearchLessonList;
