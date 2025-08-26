import { CATEGORY_KEYS, CategoryKey } from '@/constants/category';
import CategoryTag from '../atoms/tags/CategoryTag';

type CategoryFilterProps = {
  selectedCategories: CategoryKey[];
  onChange: (selectedCategories: CategoryKey[]) => void;
};

const CategoryFilter = ({
  onChange,
  selectedCategories = [],
}: CategoryFilterProps) => {
  const handleSelectCategory = (category: CategoryKey) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div className='flex w-[calc(100%+4rem)] gap-[1rem] overflow-x-auto px-[2rem] py-[1.5rem]'>
      {CATEGORY_KEYS.map((category) => (
        <CategoryTag
          key={category}
          category={category}
          disabled={!selectedCategories.includes(category)}
          onClick={() => handleSelectCategory(category)}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
