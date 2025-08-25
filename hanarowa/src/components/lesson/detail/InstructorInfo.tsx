type InstructorInfoProps = {
  name: string;
  content: string;
};

const InstructorInfo = ({ name, content }: InstructorInfoProps) => {
  const contents = content.split('\n');
  return (
    <div className='flex flex-col items-start justify-center gap-[2rem] py-[2.5rem]'>
      <p className='font-bold-22 text-black'>강사소개</p>
      <div className='flex flex-col gap-[0.8rem]'>
        <p className='font-bold-20 text-black'>{name}</p>
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
