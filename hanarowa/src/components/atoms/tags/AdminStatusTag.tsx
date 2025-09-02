import { StatusKey } from '@/constants/status';

type AdminStatusTagProps = {
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};

const AdminStatusTag = ({ status }: AdminStatusTagProps) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '대기중';
      case 'APPROVED':
        return '승인';
      case 'REJECTED':
        return '반료';
      default:
        return '대기중';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-orange text-white';
      case 'APPROVED':
        return 'bg-main text-white';
      case 'REJECTED':
        return 'bg-pink text-white';
      default:
        return 'bg-orange text-white';
    }
  };

  return (
    <span
      className={`flex h-[2.4rem] w-[6rem] flex-col items-center justify-center rounded-12 text-12 font-medium ${getStatusColor(status)}`}
    >
      {getStatusText(status)}
    </span>
  );
};

export default AdminStatusTag;