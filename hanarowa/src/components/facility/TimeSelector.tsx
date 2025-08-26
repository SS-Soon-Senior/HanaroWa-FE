import { Button } from '@/components/atoms';

type TimeSelectorProps = {
  times: string[];
  selectedTimes: string[];
  bookedTimes: string[];
  onTimeSelect: (time: string) => void;
};

const TimeSelector = ({
  times,
  selectedTimes,
  bookedTimes,
  onTimeSelect,
}: TimeSelectorProps) => {
  return (
    <div className='flex w-full flex-col gap-[1.4rem] pt-[2.4rem] pl-[0.5rem]'>
      <p className='font-medium-20'>예약 시간</p>
      <div className='grid grid-cols-3 gap-x-[1rem] gap-y-[1.7rem]'>
        {times.map((time: string) => {
          const isBooked = bookedTimes.includes(time);
          const isSelected = selectedTimes.includes(time);

          return (
            <Button
              key={time}
              variant={isSelected ? 'green' : isBooked ? 'disabled' : 'line'}
              sizeType='xs'
              onClick={() => !isBooked && onTimeSelect(time)}
              disabled={isBooked}
            >
              {time}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelector;
