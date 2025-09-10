import { components } from '@/types/api';
import { client } from '../../client';

type LessonGisuDetailResponse =
  components['schemas']['ApiResponseLessonGisuDetailResponseDTO'];

const getLessonGisuDetail = async (
  lessonGisuId: number
): Promise<LessonGisuDetailResponse> => {
  const { data } = await client.GET('/api/admin/lesson/gisu/{lessonGisuId}', {
    params: {
      path: { lessonGisuId },
    },
  });

  return data as LessonGisuDetailResponse;
};

export default getLessonGisuDetail;
