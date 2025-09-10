import { IcUsers } from '@/assets/svg';
import { components } from '@/types/api';
import { formatDuration, formatPrice } from '@/utils/formatter';
import Image from 'next/image';
import Link from 'next/link';

type AdminLessonCardProps = components['schemas']['AdminLessonListResponseDTO'];

const AdminLessonCard = ({
  lessonGisuId,
  lessonName = '',
  instructor = '',
  lessonImg,
  lessonFee = 0,
  participants = 0,
  duration = '',
  capacity = 20,
}: AdminLessonCardProps) => {
  return (
    <Link
      href={`/admin/lesson/${lessonGisuId}/member`}
      className='flex w-full flex-col gap-[1.7rem] overflow-hidden'
    >
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
          {instructor} · {formatDuration(duration)}
        </p>
        <div className='flex items-center justify-between'>
          <div className='font-bold-16 text-main flex items-center gap-[0.6rem]'>
            <IcUsers width={20} height={20} />
            <span>
              {participants}/{capacity}명
            </span>
          </div>
        </div>
        <p className='font-bold-18 text-black'>
          월 {formatPrice(lessonFee!)}원
        </p>
      </div>
    </Link>
  );
};

export default AdminLessonCard;
