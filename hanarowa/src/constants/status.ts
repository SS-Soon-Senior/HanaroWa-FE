export type StatusKey =
  | 'reservation' //예약중
  | 'inprogress' //수강중
  | 'teaching' //수업중
  | 'complete' //완료
  | 'approved' //승인
  | 'rejected' //반려
  | 'pending'; //대기중

export const STATUS_META = {
  reservation: { title: '예약 중', className: 'bg-[#EEF2FF] text-[#4F46E5]' },
  inprogress: { title: '수강 중', className: 'bg-[#EEF2FF] text-[#4F46E5]' },
  teaching: { title: '수업 중', className: 'bg-[#EEF2FF] text-[#4F46E5]' },
  complete: { title: '완료', className: 'bg-[#DCFCE7] text-[#166534]' },
  approved: { title: '승인', className: 'bg-main text-white' },
  rejected: { title: '반려', className: 'bg-pink text-white' },
  pending: { title: '대기중', className: 'bg-orange text-white' },
} as const satisfies Record<StatusKey, { title: string; className: string }>;
