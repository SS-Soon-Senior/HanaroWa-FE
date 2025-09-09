import { components } from '@/types/api';
import { client } from '../../client';

type LessonGisuDetailResponse =
  components['schemas']['ApiResponseLessonGisuDetailResponseDTO'];

const getLessonGisuDetail = async (
  lessonGisuId: number
): Promise<LessonGisuDetailResponse> => {
  const { data, error } = await client.GET(
    '/api/admin/lesson/gisu/{lessonGisuId}',
    {
      params: {
        path: { lessonGisuId },
      },
    }
  );

  if (error) {
    throw new Error(`강좌 기수 상세 정보를 가져오는데 실패했습니다: ${error}`);
  }

  return data as LessonGisuDetailResponse;
};

export default getLessonGisuDetail;
