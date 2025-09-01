'use client';

import { usePostAIJobRec, usePostAICourseRec } from '@/apis';
import { IcAiCalendar, IcAiSearch, IcSend } from '@/assets/svg';
import { components } from '@/types/api';
import { AiButton, AiChat, Button, Header, Layout, Input } from '@components';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

type ChatMessage = {
  id: number;
  type: 'bot' | 'user' | 'bot-response';
  title?: string;
  content: React.ReactNode;
  actions?: 'initial' | 'after-recommendation' | 'none';
  isLoading?: boolean;
};

const Page = () => {
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      title: '안녕하세요!🎓',
      content:
        '하나로와 AI  상담사입니다. 수강하신 강좌 기반으로 강좌 또는 직업을 추천해드려요!',
      actions: 'initial',
    },
  ]);
  const [currentOption, setCurrentOption] = useState<'lesson' | 'job' | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const courseMutation = usePostAICourseRec();
  const jobMutation = usePostAIJobRec();

  const handleUserInputSubmit = () => {
    const userInput = inputRef.current?.value;
    if (!userInput) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput,
      actions: 'none',
    };

    const loadingMessage: ChatMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: 'AI가 답변을 생성하고 있어요. 잠시만 기다려주세요...',
      isLoading: true,
      actions: 'none',
    };

    setChatHistory((prev) => [...prev, userMessage, loadingMessage]);

    if (currentOption === 'lesson') {
      courseMutation.mutate(
        { body: { interest: userInput } },
        {
          onSuccess: (
            data: components['schemas']['ApiResponseRecResponseDto']
          ) => handleApiResponse(data),
          onError: handleApiError,
        }
      );
    } else if (currentOption === 'job') {
      jobMutation.mutate(
        { body: { experience: userInput } },
        {
          onSuccess: (
            data: components['schemas']['ApiResponseRecResponseDto']
          ) => handleApiResponse(data),
          onError: handleApiError,
        }
      );
    }

    if (inputRef.current) inputRef.current.value = '';
    setCurrentOption(null);
  };

  // API 응답 성공 시 처리
  const handleApiResponse = (
    recommendations: components['schemas']['ApiResponseRecResponseDto']
  ) => {
    const recs = recommendations.result?.recommendations;
    const responseContent = (
      <div className='flex flex-col gap-[1rem] px-[1rem]'>
        {recs?.map((rec, index) => (
          <div key={index} className='flex flex-col gap-[0.6rem]'>
            <p className='font-heavy-18 text-gray280 gap-[0.4rem]'>
              {rec.name}
            </p>
            <p>{rec.reason}</p>
          </div>
        ))}
      </div>
    );

    const responseMessage: ChatMessage = {
      id: Date.now(),
      type: 'bot-response',
      content: responseContent,
      actions: 'after-recommendation',
    };

    setChatHistory((prev) => [
      ...prev.filter((msg) => !msg.isLoading),
      responseMessage,
    ]);
  };

  const handleApiError = () => {
    const errorMessage: ChatMessage = {
      id: Date.now(),
      type: 'bot',
      content:
        '죄송합니다, 답변을 생성하는 데 오류가 발생했어요. 다시 시도해 주세요.',
      actions: 'initial',
    };
    setChatHistory((prev) => [
      ...prev.filter((msg) => !msg.isLoading),
      errorMessage,
    ]);
  };

  const handleOptionClick = (option: 'lesson' | 'job') => {
    setCurrentOption(option);
    const promptMessage: ChatMessage = {
      id: Date.now(),
      type: 'bot',
      content:
        option === 'lesson'
          ? '관심 있는 강좌 분야를 입력해주세요. (예: 스마트폰, 영어 회화)'
          : '이전 경력이나 관심 직업을 입력해주세요. (예: 20년 간의 사무직 경험)',
      actions: 'none',
    };
    setChatHistory((prev) => [...prev, promptMessage]);
  };

  return (
    <Layout
      header={<Header title='AI 상담하기' showBackButton />}
      footer={
        currentOption && (
          <div className='flex w-full items-center justify-center px-[1.6rem] pt-[1.2rem] pb-[4rem]'>
            <Input
              ref={inputRef}
              placeholder='여기에 입력하세요...'
              fullWidth
              containerClassName='rounded-[3rem] border-0'
              rightContent={
                <Button
                  onClick={handleUserInputSubmit}
                  disabled={courseMutation.isPending || jobMutation.isPending}
                  className='h-fit w-fit rounded-full px-[0.8rem] py-[0.8rem]'
                >
                  <IcSend />
                </Button>
              }
            />
          </div>
        )
      }
    >
      <div className='flex w-full flex-col gap-[2rem]'>
        {chatHistory.map((chat) => (
          <div key={chat.id}>
            {chat.type !== 'user' && (
              <AiChat isLoading={chat.isLoading} title={chat.title}>
                {chat.content}
              </AiChat>
            )}
            {chat.type === 'user' && (
              <div className='bg-main font-medium-18 self-end rounded-lg px-[1.6rem] py-[0.6rem] text-white'>
                {chat.content}
              </div>
            )}

            {chat.actions === 'initial' && (
              <div className='mt-[2rem] flex w-full flex-col gap-[1rem]'>
                <AiButton
                  title='AI 추천 강좌'
                  leftContent={<IcAiSearch />}
                  content='내가 수강한 강좌와 내 관심사에 맞는 강좌 추천받기'
                  onClick={() => handleOptionClick('lesson')}
                />
                <AiButton
                  title='AI 추천 직업'
                  leftContent={<IcAiCalendar />}
                  content='내가 수강한 강좌와 내 경력을 기반으로 직업 추천받기'
                  onClick={() => handleOptionClick('job')}
                />
              </div>
            )}
            {chat.actions === 'after-recommendation' && (
              <div className='mt-[2rem] flex flex-col gap-[1rem]'>
                <AiButton
                  title='강좌 신청 바로가기'
                  onClick={() => router.push('/lesson')}
                />
                <AiButton
                  title='다른 강좌 추천받기'
                  onClick={() => handleOptionClick('lesson')}
                />
                <AiButton
                  title='다른 직업 추천받기'
                  onClick={() => handleOptionClick('job')}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Page;
