'use client';

import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const RefreshPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        // 직접 백엔드로 요청 (API 라우트 없이)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reissue`,
          {
            method: 'POST',
            credentials: 'include', // 쿠키 자동 포함
            cache: 'no-store',
          }
        );

        if (response.ok) {
          console.log('Token refresh successful');
          router.replace('/');
        } else {
          console.error(
            'Token refresh failed:',
            response.status,
            await response.text()
          );
          router.replace('/auth/login/social');
        }
      } catch (error) {
        console.error('Refresh error:', error);
        router.replace('/auth/login/social');
      } finally {
        setIsLoading(false);
      }
    };

    handleRefresh();
  }, [router]);

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <ClipLoader color='#00847B' size={30} />
      </div>
    );
  }

  return null;
};

export default RefreshPage;
