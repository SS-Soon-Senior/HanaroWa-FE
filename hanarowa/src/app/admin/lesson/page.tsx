import { getLessons } from '@/apis/lesson';
import { components } from '@/types/api';
import { Header, Layout, LessonCard } from '@components';
import { cookies } from 'next/headers';
import Link from 'next/link';

export type AdminLesson = components['schemas']['AdminLessonListResponseDTO'];
type ApiListEnvelope<T> = {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  result?: T[];
};

const Page = async () => {
  const token = (await cookies()).get('accessToken')?.value; // ← 쿠키에서 읽기
  const bearer = token
    ? token.startsWith('Bearer ')
      ? token
      : `Bearer ${token}`
    : '';

  const { data } = await getLessons({
    headers: bearer ? { Authorization: bearer } : undefined, // ← 헤더로 전달
  });

  const lessons: AdminLesson[] =
    (data as ApiListEnvelope<AdminLesson> | undefined)?.result ?? [];

  return (
    <Layout header={<Header title='강좌 목록' showSearchButton />}>
      <div className='grid w-full grid-cols-2 gap-[2.5rem]'>
        {lessons.map((l) => (
          <Link key={l.id} href={`/admin/lesson/${l.id}/member`}>
            <LessonCard
              lessonId={l.id}
              lessonName={l.lessonName ?? ''}
              instructor={l.instructor ?? ''}
              lessonImg={l.lessonImg ?? ''}
              duration={l.duration ?? ''}
              currentStudentCount={l.participants ?? 0}
              capacity={l.capacity ?? 0}
              lessonFee={l.lessonFee ?? 0}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Page;
