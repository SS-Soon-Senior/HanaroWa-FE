import { STATUS_META, StatusKey } from '@/constants/status';
import { PropsWithChildren } from 'react';

const LessonStatusTag = ({
  status,
  isActive = true,
}: PropsWithChildren<{ status: StatusKey; isActive?: boolean }>) => {
  const { title } = STATUS_META[status];

  const getBackgroundColor = () => {
    if (!isActive) return 'bg-gray7eb';

    switch (status) {
      case 'approved':
        return 'bg-main';
      case 'rejected':
        return 'bg-pink';
      case 'pending':
        return 'bg-orange';
      default:
        return 'bg-orange';
    }
  };

  return (
    <span
      className={`rounded-18 flex h-[3.6rem] w-[6rem] flex-shrink-0 flex-col items-center justify-center ${isActive ? 'font-medium-14 text-white' : 'font-medium-14'} ${getBackgroundColor()}`}
    >
      {title}
    </span>
  );
};

const LessonStatusTags = ({ currentStatus }: { currentStatus: StatusKey }) => {
  const lessonStatuses: StatusKey[] = ['approved', 'rejected', 'pending'];

  return (
    <section className='flex items-center justify-center gap-[3rem] self-stretch'>
      {lessonStatuses.map((status) => (
        <LessonStatusTag
          key={status}
          status={status}
          isActive={status === currentStatus}
        />
      ))}
    </section>
  );
};

export default LessonStatusTags;
export { LessonStatusTag };
