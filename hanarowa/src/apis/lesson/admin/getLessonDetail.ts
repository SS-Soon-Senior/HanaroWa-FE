import { components } from '@/types/api';
import { client } from '../../client';

type LessonDetailResponse =
  components['schemas']['ApiResponseLessonDetailResponseDTO'];

const getLessonDetail = async (
  lessonId: number
): Promise<LessonDetailResponse> => {
  const { data, error } = await client.GET('/api/admin/lesson/{lessonId}', {
    params: {
      path: { lessonId },
    },
  });

  if (error) {
    throw new Error(`강좌 상세 정보를 가져오는데 실패했습니다: ${error}`);
  }

  return data as LessonDetailResponse;
};

export default getLessonDetail;
