import { client } from '@apis';

const getManageLessons = () => {
  return client.GET('/api/admin/lesson/manage');
};

export default getManageLessons;
