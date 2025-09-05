'use client';

import { IcHeaderArrow } from '@/assets/svg';
import { useRouter } from 'next/navigation';

const GoBackButton = ({ backUrl }: { backUrl?: string }) => {
  const router = useRouter();
  const handleGoBack = () => {
    if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return <IcHeaderArrow onClick={handleGoBack} />;
};

export default GoBackButton;
