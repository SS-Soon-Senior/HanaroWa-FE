import { CATEGORY_META, CategoryKey } from '@/constants/category';
import { PropsWithChildren } from 'react';

const CategoryTag = ({
  category,
}: PropsWithChildren<{ category: CategoryKey }>) => {
  const { title, className } = CATEGORY_META[category];

  return (
    <span
      className={`font-bold-14 inline-block rounded-full px-[1.6rem] py-[0.8rem] ${className}`}
    >
      {title}
    </span>
  );
};

export default CategoryTag;
