import { TanstackQueryClient } from '@apis';

const useGetFacility = (branchId: number) => {
  return TanstackQueryClient.useQuery(
    'get',
    '/api/facility/branch/{branchId}',
    {
      params: {
        path: { branchId },
      },
    }
  );
};

export default useGetFacility;
