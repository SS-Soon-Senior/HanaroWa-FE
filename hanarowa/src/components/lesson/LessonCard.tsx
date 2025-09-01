import { IcUsers } from '@/assets/svg';
import { components } from '@/types/api';
import Image from 'next/image';

type LessonCardProps = components['schemas']['LessonInfoResponseDTO'];

const LessonCard = ({
  lessonName = '',
  instructor = '',
  lessonImg,
  lessonFee,
  currentStudentCount,
  duration = '',
  capacity,
}: LessonCardProps) => {
  return (
    <div className='flex w-full flex-col gap-[1.7rem] overflow-hidden'>
      <div className='relative aspect-square'>
        <Image
          src={lessonImg!}
          alt={lessonName}
          fill
          className='rounded-8 object-cover'
        />
      </div>

      <div className='flex flex-col gap-[0.6rem]'>
        <p className='font-bold-20 text-black'>{lessonName}</p>
        <p className='font-medium-16 text-gray4a9'>
          {instructor} · {duration}
        </p>
        <div className='flex items-center justify-between'>
          <div className='font-bold-16 text-main flex items-center gap-[0.6rem]'>
            <IcUsers width={20} height={20} />
            <span>
              {currentStudentCount}/{capacity}명
            </span>
          </div>
        </div>
        <p className='font-bold-18 text-black'>{lessonFee}원</p>
      </div>
    </div>
  );
};

export default LessonCard;
