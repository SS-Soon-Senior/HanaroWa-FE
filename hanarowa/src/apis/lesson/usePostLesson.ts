import { components } from '@/types/api';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const usePostLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      // FormData 내용 로깅
      console.log('전송할 FormData 내용:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // FormData를 직접 fetch로 전송 (openapi-fetch는 FormData 타입 지원에 제한이 있음)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lesson/create`,
        {
          method: 'POST',
          body: formData,
          // Content-Type은 자동으로 설정됨 (multipart/form-data boundary 포함)
        }
      );

      console.log('응답 상태:', response.status);
      console.log('응답 헤더:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('에러 응답:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      return response.json() as Promise<
        components['schemas']['ApiResponseVoid']
      >;
    },
    onSuccess: () => {
      console.log('강좌 개설 성공');
      // 강좌 목록을 다시 불러와서 화면을 갱신
      queryClient.invalidateQueries({ queryKey: ['lesson', 'list'] });
    },
    onError: (error) => {
      console.error('강좌 개설 실패:', error);
    },
  });
};

export default usePostLesson;
