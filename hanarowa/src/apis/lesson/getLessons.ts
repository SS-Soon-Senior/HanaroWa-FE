import { client } from '@apis';

const getLessons = () => {
  return client.GET('/admin/lesson');
};

export default getLessons;
