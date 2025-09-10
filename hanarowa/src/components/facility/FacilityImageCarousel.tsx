'use client';

import { IcWhitearrow, IcWhitearrowreverse } from '@/assets/svg';
import { getValidImageUrl } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';

type FacilityImageCarouselProps = {
  images: string[];
};

const FacilityImageCarousel = ({ images }: FacilityImageCarouselProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageIndex = () => {
    setImageIndex((prev) => prev + 1);
  };

  const handleImageIndexMinus = () => {
    setImageIndex((prev) => prev - 1);
  };

  // 유효한 이미지 URL 가져오기
  const validImageUrl = getValidImageUrl(images[imageIndex]);

  return (
    <>
      <div className='relative min-h-[23rem] w-full pt-[2.6rem]'>
        <Image
          src={validImageUrl}
          alt='Facility Image'
          fill
          objectFit='contain'
        />
        {imageIndex < images.length - 1 && (
          <div
            onClick={handleImageIndex}
            className='bg-opacity-30 absolute top-1/2 right-[2.8rem] flex h-[3.6rem] w-[3.6rem] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-black'
          >
            <IcWhitearrow />
          </div>
        )}
        {imageIndex > 0 && (
          <div
            onClick={handleImageIndexMinus}
            className='bg-opacity-30 absolute top-1/2 left-[2.8rem] flex h-[3.6rem] w-[3.6rem] -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-black'
          >
            <IcWhitearrowreverse />
          </div>
        )}
      </div>
    </>
  );
};

export default FacilityImageCarousel;
