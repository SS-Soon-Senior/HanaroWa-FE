import { IcLocation, IcPhone, IcEmail, IcCake } from '@/assets/svg';
import { components } from '@/types/api';

type MemberCardProps = components['schemas']['MemberListResponseDTO'];

const DivStyle =
  'flex flex-row items-center gap-[1.2rem] font-medium-14 text-gray353';

const MemberCard = ({ name, branch, phone, email, birth }: MemberCardProps) => {
  return (
    <div className='rounded-16 relative flex w-full flex-col bg-white shadow-sm ring-1 ring-black/5'>
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.8rem]'>
        <div className={DivStyle}>
          <p>{name}</p>
        </div>
        <div className={DivStyle}>
          <IcLocation />
          <p>{branch}</p>
        </div>
        <div className={DivStyle}>
          <IcPhone />
          <p>{phone}</p>
        </div>
        <div className={DivStyle}>
          <IcEmail />
          <p>{email}</p>
        </div>
        <div className={DivStyle}>
          <IcCake />
          <p>{birth}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
