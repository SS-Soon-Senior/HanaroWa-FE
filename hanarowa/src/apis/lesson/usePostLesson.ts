'use client';

import { components } from '@/types/api';
import { getAccessToken } from '@/utils/common/auth';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const usePostLesson = () => {
  const queryClient = useQueryClient();
  const accessToken = getAccessToken();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const authHeader = accessToken
        ? accessToken.startsWith('Bearer ')
          ? accessToken
          : `Bearer ${accessToken}`
        : undefined;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/lesson/create`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
          headers: {
            ...(authHeader ? { Authorization: authHeader } : {}),
          },
        }
      );

      if (!response.ok) {
        toast.error('강좌 개설에 실패했어요. 다시 시도해주세요.');
      }

      return response.json() as Promise<
        components['schemas']['ApiResponseVoid']
      >;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson', 'list'] });
    },
    onError: (error) => {
      console.warn('강좌 개설 실패:', error);
      toast.error('강좌 개설에 실패했어요. 다시 시도해주세요.');
    },
  });
};

export default usePostLesson;
