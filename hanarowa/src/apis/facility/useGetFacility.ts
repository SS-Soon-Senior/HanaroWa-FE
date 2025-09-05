import { TanstackQueryClient } from '@apis';

const useGetFacility = (branchId: number) => {
  return TanstackQueryClient.useQuery('get', '/facility/branch/{branchId}', {
    params: {
      path: { branchId },
    },
  });
};

export default useGetFacility;
