export type Status = '승인' | '반려' | '대기중';

export interface BaseLessonData {
  title: string;
  instructorName: string;
  instructorIntro: string;
  lessonIntro: string;
  fee: string;
  category: string;
  startDate: string;
  endDate: string;
  days: string;
  time: string;
  lessonDescription: string;
  expectedParticipants: string;
  additionalContents: string[];
}

export interface Lesson extends BaseLessonData {
  duration?: string;
  imageUrl?: string;
  status?: Status;
}

export interface LessonFormData extends BaseLessonData {
  branchId?: string;
  lessonImage: File | null;
}

export interface LessonFormErrors {
  [key: string]: string;
}

export interface LessonFormState {
  data: LessonFormData;
  errors: LessonFormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

export type LessonUpdatePayload = Omit<Lesson, 'imageUrl'>;
