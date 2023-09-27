import React from 'react';
import styles from './categoryfilter.module.scss';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div className={styles.CategoryBox}>
      <h2>კატეგორიები</h2>
      <div className={styles.CategoryFilter}>
        {categories.map((category) => (
          <label key={category}>
            <input
              type='checkbox'
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
