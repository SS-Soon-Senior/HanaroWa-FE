'use client';

import { getRefreshToken } from '@/utils/common/auth';

const postRefreshToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reissue`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: getRefreshToken(),
        }),
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
