'use client';

import { IcImgArrow } from '@/assets/svg';
import { getValidImageUrl } from '@/utils/utils';
import Image from 'next/image';

type FacilityCardProps = {
  facilityId: number;
  imageUrl: string;
  facilityName: string;
  description: string;
  height: number;
  onClick?: () => void;
};

const FacilityCard = ({
  imageUrl,
  facilityName,
  description,
  height,
  onClick,
}: FacilityCardProps) => {
  // 유효한 이미지 URL 가져오기
  const validImageUrl = getValidImageUrl(imageUrl);

  return (
    <div
      className='rounded-16 flex cursor-pointer flex-col overflow-hidden bg-white shadow-sm ring-1 ring-black/5'
      onClick={onClick}
    >
      <div className='relative' style={{ height: height * 0.6 }}>
        <Image
          src={validImageUrl}
          alt={facilityName}
          fill
          className='object-cover'
        />
        {/* 오버레이 */}
        <div className='absolute inset-0 flex flex-row bg-black/50' />

        {/* 텍스트 + 화살표 영역 */}
        <div className='absolute inset-x-0 bottom-0 flex justify-between p-[2rem]'>
          <h3 className='font-bold-24 text-white'>{facilityName}</h3>
          <IcImgArrow />
        </div>
      </div>
      {/* description 영역 */}
      <div className='flex flex-col gap-[0.8rem] p-[2rem]'>
        <p className='font-medium-16 text-grayaaa'>{description}</p>
      </div>
    </div>
  );
};

export default FacilityCard;
