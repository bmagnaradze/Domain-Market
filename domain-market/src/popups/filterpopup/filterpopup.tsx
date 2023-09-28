import React, { FC, useState } from 'react';
import styles from './filterpopup.module.scss';
import Image from 'next/image';
import NameFilter from '@/app/components/filter/namefilter/nameFilter';
import FilterControl from '@/app/containers/filtercontrol/filtercontrol';
import { Domain } from '@/app/core/types/domain.types';
import { IDomainFilter } from '@/app/core/types/filter.type';

interface IProps {
  onClose(): void;
  onFilterApply(filters: IDomainFilter): void;
  domain: Domain[];
}

const FilterPopup: FC<IProps> = ({ onClose, onFilterApply, domain }) => {
  const [filters, setFilters] = useState<IDomainFilter>();

  const onFilter = (filter: IDomainFilter) => {
    setFilters(filter);
  };

  const handleFilterClick = () => {
    if (filters) {
      onFilterApply(filters);
    }
    onClose();
  };

  return (
    <div className={styles.Popup}>
      <div className={styles.PopupHeader}>
        <h4>ფილტრი</h4>
        <Image
          onClick={() => {
            onClose();
          }}
          src='images/close-icon.svg'
          width={36}
          height={36}
          alt='img'
        />
      </div>
      <FilterControl
        onSearch={onFilter}
        minPrice={0}
        maxPrice={0}
        priceValues={[]}
        domain={domain}
      />
      <div className={styles.SearchButton}>
        <button onClick={handleFilterClick}>ძიება</button>
      </div>
    </div>
  );
};

export default FilterPopup;
