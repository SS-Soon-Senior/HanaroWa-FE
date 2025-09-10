import { Button } from '@/components';

type DateSelectorProps = {
  dates: string[];
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
};

const DateSelector = ({
  dates,
  selectedDate,
  onDateSelect,
}: DateSelectorProps) => {
  return (
    <div className='flex w-full flex-col gap-[1.4rem] pt-[2.3rem] pl-[0.5rem]'>
      <p className='font-medium-20'>예약 날짜</p>
      <div className='flex flex-row gap-[1rem]'>
        {dates.map((date: string) => (
          <Button
            key={date}
            variant={selectedDate === date ? 'green' : 'line'}
            sizeType='xs'
            onClick={() => onDateSelect(date)}
          >
            {date.slice(5).replace('-', '/')}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateSelector;
