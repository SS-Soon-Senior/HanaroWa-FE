export type Status = '승인' | '반려' | '대기중';

export type Lesson = {
  title: string;
  instructorName: string;
  instructorIntro: string;
  lessonIntro: string;
  fee: string;
  category: string;
  startDate: string;
  endDate: string;
  duration?: string; // 계산된 기간
  days: string;
  time: string;
  imageUrl?: string;
  lessonDescription: string;
  expectedParticipants: string;
  additionalContents: string[];
  status?: Status; // 추가
};

export interface LessonFormData {
  title: string;
  instructorName: string;
  instructorIntro: string;
  lessonIntro: string;
  fee: string;
  category: string;
  branchId?: string;
  startDate: string;
  endDate: string;
  days: string;
  time: string;
  lessonImage: File | null;
  lessonDescription: string;
  expectedParticipants: string;
  additionalContents: string[];
}

export type LessonUpdatePayload = Omit<Lesson, 'imageUrl'>;
