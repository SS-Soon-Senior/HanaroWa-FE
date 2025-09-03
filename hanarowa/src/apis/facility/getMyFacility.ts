import { client } from '../client';

const getMyFacility = () => {
  return client.GET('/facility/reservation');
};

export default getMyFacility;
