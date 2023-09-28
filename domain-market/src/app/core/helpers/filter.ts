import { Domain } from '../types/domain.types';
import { IDomainFilter } from '../types/filter.type';

export const domainFilter = (data: Domain[], filters: IDomainFilter) => {
  return data.filter((item) => {
    const categoryMatch =
      filters.selectedCategories.length === 0 ||
      filters.selectedCategories.includes(item.category);

    const domainMatch =
      filters.selectedDomains.length === 0 ||
      filters.selectedDomains.includes(item.domain);

    const searchMatch = item.domainName
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const priceMatch =
      item.priceGel >= filters.minPrice && item.priceGel <= filters.maxPrice;

    const characterCountMatch =
      item.domainName.length >= filters.minSymbolLenght &&
      item.domainName.length <= filters.maxSymbolLenght;

    return (
      categoryMatch &&
      domainMatch &&
      searchMatch &&
      priceMatch &&
      characterCountMatch
    );
  });
};
