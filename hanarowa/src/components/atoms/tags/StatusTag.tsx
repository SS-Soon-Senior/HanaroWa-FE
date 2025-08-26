import { STATUS_META, StatusKey } from '@/constants/status';
import { PropsWithChildren } from 'react';

const StatusTag = ({
  status,
  isActive = true,
}: PropsWithChildren<{ status: StatusKey; isActive?: boolean }>) => {
  const { title, className } = STATUS_META[status];

  return (
    <span
      className={`font-bold-16 inline-block rounded-full px-[1.6rem] py-[0.8rem] ${isActive ? className : 'border border-gray-300 bg-transparent text-gray-400'}`}
    >
      {title}
    </span>
  );
};

export default StatusTag;
