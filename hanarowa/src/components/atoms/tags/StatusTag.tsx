import { PropsWithChildren } from 'react';

type Status = '승인' | '반려' | '대기중';

// 개별 StatusTag 컴포넌트
const StatusTag = ({
  status,
  isActive = true,
}: PropsWithChildren<{ status: Status; isActive?: boolean }>) => {
  const getStatusStyles = (status: Status, isActive: boolean) => {
    const baseStyles = `
      flex flex-col justify-center items-center w-[60px] h-[36px] rounded-18 cursor-pointer transition-all duration-200
    `;

    if (!isActive) {
      return `${baseStyles} text-gray353 bg-gray7eb font-medium-14`;
    }

    switch (status) {
      case '승인':
        return `${baseStyles} text-white bg-main font-medium-14`;
      case '반려':
        return `${baseStyles} text-white bg-pink font-medium-14`;
      case '대기중':
        return `${baseStyles} text-white bg-orange font-medium-14`;
      default:
        return baseStyles;
    }
  };

  return <span className={getStatusStyles(status, isActive)}>{status}</span>;
};

// 메인 StatusTags 컴포넌트 (여러 태그를 표시)
const StatusTags = ({ currentStatus }: { currentStatus: Status }) => {
  const statuses: Status[] = ['승인', '반려', '대기중'];

  return (
    <div
      className='flex items-center justify-center gap-[3rem]'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '30px',
        alignSelf: 'stretch',
      }}
    >
      {statuses.map((status) => (
        <StatusTag
          key={status}
          status={status}
          isActive={status === currentStatus}
        />
      ))}
    </div>
  );
};

export default StatusTags;

export { StatusTag };
