import { TanstackQueryClient } from '@apis';

const useGetFilterLessonList = (branchId: number) => {
  const response = TanstackQueryClient.useQuery(
    'get',
    '/lesson/list/{branchId}',
    {
      params: {
        path: {
          branchId: branchId,
        },
      },
    }
  );
  return response.data;
};

export default useGetFilterLessonList;
