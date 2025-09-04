import { client } from '@apis';

const getFacilities = (branchId: number) => {
  return client.GET('/facility/branch/{branchId}', {
    params: {
      path: { branchId },
    },
    credentials: 'include',
  });
};

export default getFacilities;
