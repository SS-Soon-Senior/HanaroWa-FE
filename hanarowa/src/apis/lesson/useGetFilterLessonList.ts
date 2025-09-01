import { TanstackQueryClient } from '@apis';

const useGetFilterLessonList = (branchId: number, categories: string[]) => {
  const response = TanstackQueryClient.useQuery(
    'get',
    '/lesson/list/{branchId}',
    {
      params: {
        path: {
          branchId: branchId,
        },
        query: {
          categories: categories,
        },
      },
    }
  );
  return response.data;
};

export default useGetFilterLessonList;
