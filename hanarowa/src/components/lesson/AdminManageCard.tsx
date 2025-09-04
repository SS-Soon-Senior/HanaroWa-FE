import AdminStatusTag from '@/components/atoms/tags/AdminStatusTag';
import { components } from '@/types/api';
import { formatDuration } from '@/utils/formatter';
import Link from 'next/link';

type AdminManageCardProps =
  components['schemas']['AdminManageLessonResponseDTO'] & {
    onApprove: (id: number) => void;
    onReject: (id: number) => void;
  };

const AdminManageCard = ({
  id,
  lessonName = '',
  instructor = '',
  description = '',
  duration = '',
  state,
  onApprove,
  onReject,
}: AdminManageCardProps) => {
  const renderActionButtons = () => {
    if (state === 'PENDING') {
      return (
        <div className='flex gap-[0.8rem]'>
          <button
            onClick={(e) => {
              e.preventDefault();
              onApprove(id!);
            }}
            className='rounded-6 bg-main text-12 flex h-[2.8rem] w-[5rem] flex-col items-center justify-center font-medium text-white transition-colors hover:bg-teal-600'
          >
            승인
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onReject(id!);
            }}
            className='rounded-6 bg-pink text-12 flex h-[2.8rem] w-[5rem] flex-col items-center justify-center font-medium text-white transition-colors hover:bg-red-500'
          >
            반려
          </button>
        </div>
      );
    }

    if (state === 'APPROVED' || state === 'REJECTED') {
      return (
        <Link href={`/admin/lesson/manage/${id}`}>
          <button className='rounded-6 bg-gray4f6 text-12 flex h-[2.8rem] w-[5rem] flex-col items-center justify-center font-medium text-gray-600 transition-colors hover:bg-gray-300'>
            수정
          </button>
        </Link>
      );
    }

    return null;
  };

  return (
    <div className='rounded-12 flex w-full flex-col items-start gap-[0.6rem] border border-gray-200 bg-white p-[1.6rem]'>
      <div className='flex w-full items-start justify-between'>
        <div className='flex flex-1 flex-col items-start gap-[0.6rem]'>
          <h3 className='font-bold-14 text-black'>{lessonName}</h3>
          <div className='font-medium-12 text-gray280'>{instructor}</div>
          <div className='font-medium-12 text-gray280'>{description}</div>
          <div className='font-medium-12 text-gray280'>
            {formatDuration(duration)}
          </div>
        </div>
        <AdminStatusTag status={state as 'PENDING' | 'APPROVED' | 'REJECTED'} />
      </div>

      <div className='flex w-full justify-end'>
        <div onClick={(e) => e.preventDefault()}>{renderActionButtons()}</div>
      </div>
    </div>
  );
};

export default AdminManageCard;
