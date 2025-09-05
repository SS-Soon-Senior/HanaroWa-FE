import { TanstackQueryClient } from '@apis';

const useGetFacilityDetail = (facilityId: string) => {
  return TanstackQueryClient.useQuery('get', '/facility/{facilityId}', {
    params: {
      path: {
        facilityId: Number(facilityId),
      },
    },
    enabled: !!facilityId && !isNaN(Number(facilityId)),
  });
};

export default useGetFacilityDetail;
