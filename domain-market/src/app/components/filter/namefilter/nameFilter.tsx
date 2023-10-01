import React, { ChangeEvent } from 'react';
import styles from './nameFilter.module.scss';

interface NameFilterProps {
  onSearch: (query: string) => void;
}

function NameFilter({ onSearch }: NameFilterProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    onSearch(searchQuery);
  };

  return (
    <div className={styles.InputBox}>
      <input
        name='nameFilter'
        type='text'
        placeholder='სახელით ძიება'
        onChange={handleInputChange}
      />
    </div>
  );
}

export default NameFilter;
