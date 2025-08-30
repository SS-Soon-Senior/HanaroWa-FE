import { client } from '@apis';

//서버컴포넌트에서 사용하는 경우

const getBranch = () => {
  return client.GET('/branch');
};

export default getBranch;
