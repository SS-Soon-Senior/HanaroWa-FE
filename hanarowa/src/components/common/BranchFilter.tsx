import { IcRefresh } from '@/assets/svg';

type BranchFilterProps = {
  branchName?: string;
  onChangeBranch?: () => void;
};

const BranchFilter = ({ branchName, onChangeBranch }: BranchFilterProps) => {
  return (
    <div className='flex w-full items-center justify-between'>
      <p className='font-bold-18 text-gray353'>{branchName}</p>
      <button
        onClick={onChangeBranch}
        className='flex items-center gap-[0.6rem]'
      >
        <span className='font-bold-18 text-gray353'>지점 변경</span>
        <IcRefresh />
      </button>
    </div>
  );
};

export default BranchFilter;
