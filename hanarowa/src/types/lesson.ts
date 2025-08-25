export type Lesson = {
  title: string;
  instructorIntro: string;
  lessonIntro: string;
  fee: string;
  category: string;
  startDate: string;
  endDate: string;
  days: string;
  time: string;
  imageUrl?: string;
  lessonDescription: string;
  expectedParticipants: string;
  additionalContents: string[];
};

// 입력 폼 전용 상태
export interface LessonFormData {
  title: string;
  instructorIntro: string;
  lessonIntro: string;
  fee: string;
  category: string;
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
