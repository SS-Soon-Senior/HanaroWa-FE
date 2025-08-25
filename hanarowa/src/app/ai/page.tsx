import { IcAiCalendar, IcAiSearch } from '@/assets/svg';
import { AiChat } from '@/components/ai';
import AiButton from '@/components/ai/AiButton';
import { Button, Header, Layout } from '@/components/atoms';

const Page = () => {
  return (
    <Layout
      header={<Header title='AI 상담하기' showBackButton />}
      footer={
        <div className='px-[2rem] pb-[4rem]'>
          <Button sizeType='lg'>홈으로 가기</Button>
        </div>
      }
    >
      <AiChat />
      <AiButton
        leftContent={<IcAiSearch />}
        title='AI 추천 강좌'
        content='AI가 추천하는 강의 들어보세요!'
      />
      <AiButton
        leftContent={<IcAiCalendar />}
        title='AI 추천 직업'
        content='수강하신 강의 관련 직업 추천드려요!'
      />
      <AiButton content='강좌 신청 바로가기' />
    </Layout>
  );
};
export default Page;
