'use client';

import { getAccessToken } from '@/utils/common/auth';

const postRefreshToken = async () => {
  const accessToken = getAccessToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reissue`,
      {
        method: 'POST',
        credentials: 'include',
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      }
    );

    if (!res.ok) throw new Error('Refresh failed');

    const data = await res.json();
    return { isSuccess: true, data };
  } catch (e) {
    return { isSuccess: false, error: e };
  }
};

export default postRefreshToken;
