import { STATUS_META, StatusKey } from '@/constants/status';
import { PropsWithChildren } from 'react';

const StatusTag = ({ status }: PropsWithChildren<{ status: StatusKey }>) => {
  const { title, className } = STATUS_META[status];

  return (
    <span
      className={`font-bold-16 inline-block rounded-full px-[1.6rem] py-[0.8rem] ${className}`}
    >
      {title}
    </span>
  );
};

export default StatusTag;
