import React from 'react';
import styles from '../categoryfilter/categoryfilter.module.scss';

interface DomainFilterProps {
  domains: string[];
  selectedDomains: string[];
  onDomainChange: (category: string) => void;
}

const DomainFilter: React.FC<DomainFilterProps> = ({
  domains,
  selectedDomains,
  onDomainChange,
}) => {
  return (
    <div className={styles.CategoryBox}>
      <h2>დომენის ზონა</h2>
      <div className={styles.CategoryFilter}>
        {domains.map((domain) => (
          <label key={domain}>
            <input
              type='checkbox'
              value={domain}
              checked={selectedDomains.includes(domain)}
              onChange={() => onDomainChange(domain)}
            />
            {domain}
          </label>
        ))}
      </div>
    </div>
  );
};

export default DomainFilter;
