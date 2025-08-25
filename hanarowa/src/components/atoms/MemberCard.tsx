import { IcLocation, IcPhone, IcEmail, IcCake, IcX } from '@/assets/svg';

type Props = {
  name: string;
  branch: string;
  phone: string;
  email: string;
  birth: string;
  onClick?: () => void;
};

const MemberCard = ({ name, branch, phone, email, birth, onClick }: Props) => {
  return (
    <div className='rounded-16 relative flex w-full flex-col bg-white shadow-sm ring-1 ring-black/5'>
      <button className='absolute top-4 right-4' onClick={onClick}>
        <IcX />
      </button>
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.8rem]'>
        <div className='flex flex-row'>
          <p className='font-medium-14 text-gray353'>{name}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcLocation />
          <p className='font-medium-14 text-gray353'>{branch}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcPhone />
          <p className='font-medium-14 text-gray353'>{phone}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcEmail />
          <p className='font-medium-14 text-gray353'>{email}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcCake />
          <p className='font-medium-14 text-gray353'>{birth}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
