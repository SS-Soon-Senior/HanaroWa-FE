'use client';

import { IcStarRed, IcStarEmpty } from '@/assets/svg';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  starCount: number;
  setStarCount?: Dispatch<SetStateAction<number>>;
  readOnly?: boolean;
  size?: number;
};

const StarRating = ({
  starCount,
  setStarCount,
  readOnly = false,
  size = 24,
}: Props) => {
  const handleStarClick = (index: number): void => {
    if (!readOnly) {
      const newRating = index;
      setStarCount?.(newRating);
    }
  };

  return (
    <div className='flex flex-row gap-[0.2rem]'>
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => handleStarClick(index + 1)}>
          {index < starCount ? (
            <IcStarRed width={size} height={size} viewBox='0 0 24 24' />
          ) : (
            <IcStarEmpty width={size} height={size} viewBox='0 0 24 24' />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
