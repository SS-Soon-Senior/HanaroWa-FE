'use client';

import type { components } from '@/types/api';
import { usePostLessonApply } from '@apis';
import { Button } from '@components';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function ApplyButton({ lessonGisuId }: { lessonGisuId: number }) {
  const router = useRouter();
  const mutation = usePostLessonApply();

  const handleApply = () => {
    mutation.mutate(
      { params: { path: { lessonGisuId } } },
      {
        onSuccess: (data: components['schemas']['ApiResponseString']) => {
          const message = encodeURIComponent('강좌 신청이');
          console.log(data);
          router.push(`/complete?state=${message}`);
        },
        onError: (err: Error) => {
          const payload = err as Error;
          toast.error(
            payload?.message ?? '강좌 신청에 실패했어요. 다시 시도해주세요.'
          );
        },
      }
    );
  };

  return (
    <Button
      sizeType='lg'
      onClick={handleApply}
      disabled={mutation.isPending}
      className='w-full'
    >
      {mutation.isPending ? '신청 중…' : '강좌 신청하기'}
    </Button>
  );
}

export default ApplyButton;
