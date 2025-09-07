// /lib/is-valid-token.ts

function isValidToken({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
}): {
  isAccessTokenValid?: boolean;
  isRefreshTokenValid?: boolean;
  userRole?: string;
} {
  const currentTime = Math.floor(Date.now() / 1000);

  const result: {
    isAccessTokenValid?: boolean;
    isRefreshTokenValid?: boolean;
    userRole?: string;
  } = {};

  try {
    if (accessToken) {
      const accessTokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      result.isAccessTokenValid = accessTokenPayload.exp > currentTime;
      result.userRole = accessTokenPayload.role || accessTokenPayload.authorities?.[0] || 'USER';
    }

    if (refreshToken) {
      const refreshTokenPayload = JSON.parse(atob(refreshToken.split('.')[1]));
      result.isRefreshTokenValid = refreshTokenPayload.exp > currentTime;
    }
  } catch (error) {
    console.error('Token decoding failed:', error);
    if (accessToken) result.isAccessTokenValid = false;
    if (refreshToken) result.isRefreshTokenValid = false;
  }

  return result;
}

export default isValidToken;
