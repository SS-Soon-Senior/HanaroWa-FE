import { client } from '@apis';

export interface CreateLessonRequest {
  lessonName: string;
  instructor: string;
  instruction: string;
  description: string;
  category:
    | 'DIGITAL'
    | 'LANGUAGE'
    | 'TREND'
    | 'OTHERS'
    | 'FINANCE'
    | 'HEALTH'
    | 'CULTURE';
  lessonImg?: string;
  branchId: number;
  lessonGisus: {
    capacity: number;
    lessonFee: number;
    duration: string;
    curriculums: {
      content: string;
    }[];
  }[];
}

const postLesson = (data: CreateLessonRequest) => {
  return client.POST('/lesson/create', {
    body: data,
  });
};

export default postLesson;
