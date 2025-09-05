'use client';

import { IcHeaderArrow } from '@/assets/svg';
import { useRouter } from 'next/navigation';

const GoBackButton = () => {
  const router = useRouter();
  const handleGoBack = () => router.back();

  return <IcHeaderArrow onClick={handleGoBack} />;
};

export default GoBackButton;
