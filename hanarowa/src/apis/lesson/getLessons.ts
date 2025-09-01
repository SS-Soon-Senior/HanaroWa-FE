import { client } from '@apis';

type Opts = { headers?: Record<string, string> };

const getLessons = (opts?: Opts) => {
  return client.GET('/admin/lesson', opts);
};

export default getLessons;
