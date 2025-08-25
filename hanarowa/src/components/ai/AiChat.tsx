import { IcAiByeoldol } from '@/assets/svg';

const AiChat = () => {
  return (
    <div className='flex w-full flex-shrink-0 flex-row items-start justify-start gap-[1.2rem]'>
      <IcAiByeoldol width={32} height={32} />
      <div className='flex-1 flex-col gap-[0.8rem] rounded-t-[1.6rem] rounded-br-[1.6rem] bg-[#F5F5F5] p-[1.6rem]'>
        <p className='font-bold-20 text-black'>안녕하세요! 🎓</p>
        <span className='font-medium-18 text-gray280'>
          하나로와 AI 직업 상담사입니다. 수강하신 강좌 기반으로 직업을
          추천해드려요!
        </span>
      </div>
    </div>
  );
};
export default AiChat;
