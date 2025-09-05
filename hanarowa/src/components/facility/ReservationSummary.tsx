import { IcGreencalendar, IcInfo, IcReserveclock } from '@/assets/svg';

type ReservationSummaryProps = {
  selectedDate: string | null;
  duration: number;
  startTime: string;
  endTime: string;
  toKoreanDate: (iso: string) => string;
};

const ReservationSummary = ({
  selectedDate,
  duration,
  startTime,
  endTime,
  toKoreanDate,
}: ReservationSummaryProps) => {
  const getDayOfWeek = (dateString: string): string => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    const date = new Date(dateString);

    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  };
  return (
    <div className='border-main mt-[4.5rem] flex w-full flex-col border-t-2 border-dashed pt-[3.2rem]'>
      <div className='min-h-[16rem]'>
        {selectedDate && duration > 0 ? (
          <div className='rounded-16 border-main flex w-full flex-col items-start border bg-[#E0F7FA] pl-[2rem] text-[#00695C]'>
            <p className='font-bold-20 pt-[2rem]'>선택된 예약 정보</p>
            <div className='flex flex-col gap-[0.8rem] pt-[1.2rem]'>
              <div className='flex flex-row items-center justify-center gap-[1.2rem]'>
                <IcGreencalendar />
                <p className='font-medium-18'>
                  {toKoreanDate(selectedDate)} ({getDayOfWeek(selectedDate)})
                </p>
              </div>
              <div className='flex flex-row items-center gap-[1.2rem] pb-[2rem]'>
                <IcReserveclock />
                <p className='font-medium-18'>
                  {startTime} ~ {endTime} ({duration}시간)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className='rounded-16 flex w-full flex-row items-center justify-center border border-[#FED7AA] bg-[#FEF7ED] py-[2rem]'>
            <IcInfo />
            <p className='font-bold-20 pl-[0.7rem] text-[#EA580C]'>
              선택된 예약 정보가 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationSummary;
