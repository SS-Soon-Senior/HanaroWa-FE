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

const logout = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export { getAccessToken, setAccessToken, clearAccessToken, logout };
