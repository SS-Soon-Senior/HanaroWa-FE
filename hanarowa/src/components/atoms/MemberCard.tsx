import { IcLocation, IcPhone, IcEmail, IcCake } from '@/assets/svg';

type Props = {
  name: string;
  branch: string;
  phone: string;
  email?: string;
  birth?: string;
};

const MemberCard = ({ name, branch, phone, email, birth }: Props) => {
  return (
    <div className='rounded-16 flex w-full flex-col bg-white shadow-sm ring-1 ring-black/5'>
      <div className='flex flex-col gap-[0.8rem] px-[2rem] py-[1.8rem]'>
        <div className='flex flex-row'>
          <p className='font-medium-18 text-gray353'>{name}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcLocation />
          <p className='font-medium-18 text-gray353'>{branch}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcPhone />
          <p className='font-medium-18 text-gray353'>{phone}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcEmail />
          <p className='font-medium-18 text-gray353'>{email}</p>
        </div>
        <div className='flex flex-row items-center gap-[1.2rem]'>
          <IcCake />
          <p className='font-medium-18 text-gray353'>{birth}</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
