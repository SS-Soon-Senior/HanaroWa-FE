import { CATEGORY_META, CategoryKey } from '@/constants/category';
import { cn } from '@/utils/utils';

const CategoryTag = ({
  category,
  disabled,
  onClick,
}: {
  category: CategoryKey;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { title, className } = CATEGORY_META[category];

  return (
    <span
      onClick={onClick}
      className={cn(
        `font-bold-14 flex h-fit w-fit flex-shrink-0 rounded-full px-[1.6rem] py-[0.8rem]`,
        disabled ? 'bg-gray4f6 text-gray3af' : className,
        onClick ? 'cursor-pointer' : ''
      )}
    >
      {title}
    </span>
  );
};

export default CategoryTag;
