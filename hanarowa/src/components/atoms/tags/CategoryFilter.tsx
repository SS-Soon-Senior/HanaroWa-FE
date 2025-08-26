'use client';

import { CATEGORY_KEYS, CategoryKey } from '@/constants/category';
import { useState } from 'react';
import CategoryTag from './CategoryTag';

const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey[]>([]);
  const handleSelectCategory = (category: CategoryKey) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory((prev) => prev.filter((cat) => cat !== category));
    } else {
      setSelectedCategory((prev) => [...prev, category]);
    }
  };

  return (
    <div className='flex w-[calc(100%+4rem)] gap-[1rem] overflow-x-auto px-[2rem] py-[1.5rem]'>
      {CATEGORY_KEYS.map((category) => (
        <CategoryTag
          key={category}
          category={category}
          disabled={!selectedCategory.includes(category)}
          onClick={() => handleSelectCategory(category)}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
