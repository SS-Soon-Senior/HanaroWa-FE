import { TanstackQueryClient } from '@apis';

//클라이언트 컴포넌트에서 사용하는 경우

const useGetFacilityDetail = (facilityId: string) => {
  console.log('🔥 API 호출: useGetFacilityDetail', {
    facilityId,
    timestamp: new Date().toLocaleTimeString(),
  });

  return TanstackQueryClient.useQuery('get', '/facility/detail/{facilityId}', {
    params: {
      path: {
        facilityId: Number(facilityId),
      },
    },
    enabled: !!facilityId && !isNaN(Number(facilityId)),
  });
};

export default useGetFacilityDetail;
