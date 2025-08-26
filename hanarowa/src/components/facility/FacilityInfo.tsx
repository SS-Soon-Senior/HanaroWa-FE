type FacilityInfoProps = {
  roomname: string;
  roomtext: string;
};

const FacilityInfo = ({ roomname, roomtext }: FacilityInfoProps) => {
  return (
    <div className='flex w-full flex-col gap-[1.2rem] pt-[2.6rem] pl-[1.7rem]'>
      <p className='font-bold-24'>{roomname}</p>
      <p className='font-medium-18 text-grayaaa'>{roomtext}</p>
    </div>
  );
};

export default FacilityInfo;
