import Image from 'next/image';

export default function SplashPage() {
  return (
    <div className='relative flex flex-col items-center pt-[25.7rem]'>
      <Image
        src='/imgs/logo.png'
        alt='logo'
        width={187}
        height={187}
        priority
      />
      <p className='font-medium-26 relative mt-[-2rem] text-center text-black'>
        하나로와
      </p>
    </div>
  );
}
