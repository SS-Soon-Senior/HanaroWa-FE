'use client';

import { IcStarRed, IcStarEmpty } from '@/assets/svg';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  starCount: number;
  setStarCount?: Dispatch<SetStateAction<number>>;
  readOnly?: boolean;
};

const StarRating = ({ starCount, setStarCount, readOnly = false }: Props) => {
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
          {index < starCount ? <IcStarRed /> : <IcStarEmpty />}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
