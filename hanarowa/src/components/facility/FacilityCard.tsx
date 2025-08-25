import { IcImgArrow } from '@/assets/svg';
import Image from 'next/image';

type FacilityCardProps = {
  imageUrl: string;
  facilityName: string;
  description: string;
  height: number;
  onClick?: () => void;
};

const FacilityCard = (props: FacilityCardProps) => {
  const { imageUrl, facilityName, description, height, onClick } = props;

  return (
    <div
      className='rounded-16 flex flex-col overflow-hidden bg-white shadow-sm ring-1 ring-black/5'
      onClick={onClick}
    >
      <div className='relative' style={{ height: height * 0.6 }}>
        <Image
          src={imageUrl}
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
