import { IcUsers } from '@/assets/svg';
import Image from 'next/image';
import React from 'react';

type ClassCardProps = {
  imageUrl: string;
  title: string;
  creator: string;
  date: string;
  participants: number;
  capacity: number;
  price: string;
};

const ClassCard: React.FC<ClassCardProps> = ({
  imageUrl,
  title,
  creator,
  date,
  participants,
  capacity,
  price,
}) => {
  return (
    <div className='flex w-full flex-col gap-[1.7rem] overflow-hidden'>
      <div className='relative aspect-square'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className='rounded-8 object-cover'
        />
      </div>

      <div className='flex flex-col gap-[0.6rem]'>
        <p className='font-bold-20 text-black'>{title}</p>
        <p className='font-medium-16 text-gray4a9'>
          {creator} · {date}
        </p>
        <div className='flex items-center justify-between'>
          <div className='font-bold-16 text-main flex items-center'>
            <IcUsers width={20} height={20} />
            <span>
              {participants}/{capacity}명
            </span>
          </div>
        </div>
        <p className='font-bold-18 text-black'>{price}원</p>
      </div>
    </div>
  );
};

export default ClassCard;
