import { IcDetailCalendar, IcClock, IcUp } from '@/assets/svg';

type LessonTimeTableProps = {
  startDate: string;
  classDays: string;
  duration: string;
};

const LessonTimeTable = ({
  startDate,
  classDays,
  duration,
}: LessonTimeTableProps) => {
  return (
    <div className='flex w-full flex-col gap-[2rem] py-[2.5rem]'>
      <p className='font-bold-22 text-black'>강의 일정</p>
      <div className='flex items-center gap-[2rem]'>
        <IcDetailCalendar width={24} height={24} />
        <div className='flex flex-col gap-[0.6rem]'>
          <p className='font-medium-16 text-black'>시작일</p>
          <p className='font-bold-18 text-black'>{startDate}</p>
        </div>
      </div>
      <div className='flex items-center gap-[2rem]'>
        <IcClock width={24} height={24} />
        <div className='flex flex-col gap-[0.6rem]'>
          <p className='font-medium-16 text-black'>강의시간</p>
          <p className='font-bold-18 text-black'>{classDays}</p>
        </div>
      </div>
      <div className='flex items-center gap-[2rem]'>
        <IcUp width={24} height={24} />
        <div className='flex flex-col gap-[0.6rem]'>
          <p className='font-medium-16 text-black'>수강기간</p>
          <p className='font-bold-18 text-black'>{duration}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonTimeTable;
