import { client } from '@apis';

const getManageLessons = () => {
  return client.GET('/admin/lesson/manage');
};

export default getManageLessons;