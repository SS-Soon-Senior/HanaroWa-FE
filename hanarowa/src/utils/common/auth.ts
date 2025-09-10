import Cookies from 'js-cookie';

const getAccessToken = () => {
  return Cookies.get('accessToken') || null;
};

const setAccessToken = (token: string) => {
  Cookies.set('accessToken', token, { path: '/' });
};

const clearAccessToken = () => {
  Cookies.remove('accessToken');
};

const getBranch = () => {
  return Cookies.get('branchId');
};

const setBranch = (branch: string) => {
  Cookies.set('branchId', branch, { path: '/' });
};

export {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  getBranch,
  setBranch,
};
