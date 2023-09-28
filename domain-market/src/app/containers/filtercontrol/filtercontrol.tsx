'use client';

import CategoryFilter from '@/app/components/filter/categoryfilter/categoryflter';
import DomainFilter from '@/app/components/filter/domainfilter/domainfilter';
import NameFilter from '@/app/components/filter/namefilter/nameFilter';
import PriceFilter from '@/app/components/filter/pricefilter/pricefilter';
import SymbolFilter from '@/app/components/filter/symbolfilter/symbolfilter';
import React, { useEffect, useState } from 'react';
import { Domain } from '@/app/core/types/domain.types';
import { fetchDomain } from '@/app/core/services/domain.service';
import { domainFilter } from '@/app/core/helpers/filter';
import { IDomainFilter } from '@/app/core/types/filter.type';

interface FilterControlProps {
  onSearch: (filters: IDomainFilter) => void;
  minPrice: number;
  maxPrice: number;
  priceValues: number[];
  domain: Domain[];
}

const FilterControl: React.FC<FilterControlProps> = ({
  onSearch,
  minPrice,
  maxPrice,
  priceValues,
  domain,
}) => {
  const [priceRange, setPriceRange] = useState<number[]>([10000, 25000]);
  const [symbolRange, setSymbolRange] = useState<number[]>([4, 21]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [hasMatchingDomains, setHasMatchingDomains] = useState<boolean>(true);
  const [domains, setDomains] = useState<string[]>([]);
  const [filteredDomain, setFilteredDomain] = useState(domain);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(domain.map((item) => item.category))];
    setCategories(uniqueCategories);
  }, [domain]);
  useEffect(() => {
    const uniqueDomains = [...new Set(domain.map((item) => item.domain))];
    setDomains(uniqueDomains);
  }, [domain]);

  useEffect(() => {
    const filteredList = domain.filter((item) =>
      item.domainName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDomain(filteredList);
    setHasMatchingDomains(filteredList.length > 0);
  }, [search, domain]);

  useEffect(() => {
    const filter: IDomainFilter = {
      symbolRange,
      selectedCategories,
      selectedDomains,
      search,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minSymbolLenght: symbolRange[0],
      maxSymbolLenght: symbolRange[1],
    };
    onSearch(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    domain,
    priceRange,
    search,
    selectedCategories,
    selectedDomains,
    symbolRange,
  ]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };
  const handleSymbolChange = (values: number[]) => {
    setSymbolRange(values);
  };

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
    window.scrollTo(0, 0);
  };

  const handleDomainChange = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
    window.scrollTo(0, 0);
  };
  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <div>
      <NameFilter onSearch={handleSearch} />
      <div>
        <PriceFilter
          min={0}
          max={50000}
          values={priceRange}
          onChange={handlePriceChange}
        />
        <SymbolFilter
          min={0}
          max={26}
          values={symbolRange}
          onChange={handleSymbolChange}
        />
      </div>
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <DomainFilter
        domains={domains}
        selectedDomains={selectedDomains}
        onDomainChange={handleDomainChange}
      />
    </div>
  );
};
export default FilterControl;
