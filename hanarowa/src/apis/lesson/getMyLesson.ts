import { client } from '@apis';

const getManageLessons = () => {
  return client.GET('/lesson/reservation');
};

export default getManageLessons;
