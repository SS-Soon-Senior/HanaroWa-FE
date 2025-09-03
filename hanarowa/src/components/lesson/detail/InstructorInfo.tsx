import { IcStarRed } from '@/assets/svg';

type InstructorInfoProps = {
  name: string;
  content: string;
  rating?: number;
};

const InstructorInfo = ({ name, content, rating }: InstructorInfoProps) => {
  const contents = content.split('\n');
  return (
    <div className='flex w-full flex-col items-start justify-center gap-[2rem] py-[2.5rem]'>
      <p className='font-bold-22 text-black'>강사소개</p>
      <div className='flex w-full flex-col gap-[0.8rem]'>
        <div className='flex items-center justify-between'>
          <p className='font-bold-20 text-black'>{name}</p>
          <div className='flex items-center gap-[0.4rem]'>
            <IcStarRed />
            <span className='font-bold-18 text-black'>{rating}</span>
          </div>
        </div>

        <span className='font-medium-18 whitespace-pre-wrap text-black'>
          {contents.map((line, index) => (
            <span key={index}>
              ● {line}
              <br />
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default InstructorInfo;
