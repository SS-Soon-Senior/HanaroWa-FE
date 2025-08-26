'use client';

import { IcWhitearrow, IcWhitearrowreverse } from '@/assets/svg';
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

  return (
    <>
      <div className='relative h-[22.9rem] w-full pt-[2.6rem]'>
        <Image
          src={images[imageIndex]}
          alt='Facility Image'
          fill
          objectFit='cover'
        />
      </div>
      {imageIndex < images.length - 1 && (
        <div
          onClick={handleImageIndex}
          className='bg-opacity-30 absolute top-[15.5rem] right-[2.8rem] flex h-[3.6rem] w-[3.6rem] cursor-pointer items-center justify-center rounded-full bg-black'
        >
          <IcWhitearrow />
        </div>
      )}
      {imageIndex > 0 && (
        <div
          onClick={handleImageIndexMinus}
          className='bg-opacity-30 absolute top-[15.5rem] left-[2.8rem] flex h-[3.6rem] w-[3.6rem] cursor-pointer items-center justify-center rounded-full bg-black'
        >
          <IcWhitearrowreverse />
        </div>
      )}
    </>
  );
};

export default FacilityImageCarousel;
