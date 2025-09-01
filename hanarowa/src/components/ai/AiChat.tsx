import { IcAiByeoldol } from '@/assets/svg';
import { ClipLoader } from 'react-spinners';
import { PropsWithChildren } from 'react';

type Props = {
  title?: string;
  isLoading?: boolean;
};

const AiChat = ({ title, children, isLoading }: PropsWithChildren<Props>) => {
  return (
    <div className='flex w-full flex-shrink-0 flex-row items-start justify-start gap-[1.2rem]'>
      <IcAiByeoldol width={32} height={32} />
      <div className='flex-1 flex-col gap-[0.8rem] rounded-t-[1.6rem] rounded-br-[1.6rem] bg-[#F5F5F5] p-[1.6rem]'>
        {title && <p className='font-bold-20 text-black'>{title}</p>}
        {isLoading ? (
          <div className='flex items-center justify-center gap-2'>
            <ClipLoader color='#00847B' size={20} />{' '}
            <span className='font-medium-18'>
              AI가 답변을 생성하고 있어요...
            </span>
          </div>
        ) : (
          <div className='font-medium-18 text-gray280 flex flex-col items-start justify-start whitespace-pre-wrap'>
            {children || (
              <>
                하나로와 AI 직업 상담사입니다.
                <br />
                수강하신 강좌 기반으로 직업을 추천해드려요!
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default AiChat;
