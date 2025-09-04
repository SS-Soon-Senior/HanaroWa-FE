import { client } from '@apis';

const getFacilities = () => {
  return client.GET('/facility', {
    credentials: 'include',
  });
};

export default getFacilities;
