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
        return '반려';
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
      className={`rounded-12 font-medium-14 flex h-[2.4rem] w-[6rem] flex-col items-center justify-center py-[0.5rem] ${getStatusColor(status)}`}
    >
      {getStatusText(status)}
    </span>
  );
};

export default AdminStatusTag;
