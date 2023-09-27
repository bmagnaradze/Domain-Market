'use client';

import { DomainItem } from '@/app/components/domain/domain';
import { fetchDomain } from '@/app/core/services/domain.service';
import styles from './domainList.module.scss';
import { Domain } from '@/app/core/types/domain.types';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NameFilter from '@/app/components/filter/namefilter/nameFilter';
import useMediaQuery from '@/app/core/hooks/useMediaHook';
import { breakpointsMax } from '@/app/core/helpers/breakpoints';
import CategoryFilter from '@/app/components/filter/categoryfilter/categoryflter';
import DomainFilter from '@/app/components/filter/domainfilter/domainfilter';

export default function DomainList() {
  const [domain, setDomain] = useState<Domain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeSpan, setActiveSpan] = useState(0);
  const [filteredDomain, setFilteredDomain] = useState(domain);
  const [search, setSearch] = useState('');
  const [hasMatchingDomains, setHasMatchingDomains] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

  const isPad = useMediaQuery(breakpointsMax.medium);

  useEffect(() => {
    let isMounted = true;

    async function getData() {
      try {
        const data = await fetchDomain();

        if (isMounted) {
          setDomain(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      }
    }

    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const filteredList = domain.filter((item) =>
      item.domainName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDomain(filteredList);
    setHasMatchingDomains(filteredList.length > 0);
  }, [search, domain]);

  useEffect(() => {
    const uniqueCategories = [...new Set(domain.map((item) => item.category))];
    setCategories(uniqueCategories);
  }, [domain]);
  useEffect(() => {
    const uniqueDomains = [...new Set(domain.map((item) => item.domain))];
    setDomains(uniqueDomains);
  }, [domain]);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDomainChange = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter((d) => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const box = (hasMatchingDomains ? filteredDomain : domain).map((item) => (
    <DomainItem data={item} key={item.id} />
  ));
  const handleSpanClick = (index: any) => {
    setActiveSpan(index);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
  };
  const filteredList = domain.filter((item) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category);

    const domainMatch =
      selectedDomains.length === 0 || selectedDomains.includes(item.domain);

    const searchMatch = item.domainName
      .toLowerCase()
      .includes(search.toLowerCase());

    return categoryMatch && domainMatch && searchMatch;
  });

  return (
    <>
      <>
        {!isPad && (
          <div className={styles.ListHeader}>
            <div className={styles.Quantity}>
              <span>დომენები მარკეტზე: </span>
              <b>703</b>
            </div>
            <div className={styles.HeaderFilter}>
              <div>
                <b>სორტირება:</b>

                <span
                  className={`${styles.filterOption} ${
                    activeSpan === 0 ? styles.active : ''
                  }`}
                  onClick={() => handleSpanClick(0)}
                >
                  დამატების თარიღით
                  <Image
                    src='../images/sort-icon.svg'
                    alt='img'
                    width={18}
                    height={9}
                  />
                </span>
                <span
                  className={`${styles.filterOption} ${
                    activeSpan === 1 ? styles.active : ''
                  }`}
                  onClick={() => handleSpanClick(1)}
                >
                  ვადის ამოწურვით
                </span>
                <span
                  className={`${styles.filterOption} ${
                    activeSpan === 2 ? styles.active : ''
                  }`}
                  onClick={() => handleSpanClick(2)}
                >
                  ფასით
                </span>
                <span
                  className={`${styles.filterOption} ${
                    activeSpan === 3 ? styles.active : ''
                  }`}
                  onClick={() => handleSpanClick(3)}
                >
                  ანბანით
                </span>
              </div>
              <div>
                <a href='#'>როგორ გავყიდო დომენი?</a>
              </div>
            </div>
          </div>
        )}

        {isPad && (
          <div className={styles.ListHeader}>
            <button>
              სორტირება
              <Image
                src='../images/Dropdown.svg'
                alt='logo'
                width={9}
                height={6}
              />
            </button>
            <button>
              სორტირება
              <Image
                src='../images/Dropdown.svg'
                alt='logo'
                width={9}
                height={6}
              />
            </button>
          </div>
        )}
      </>

      <div className={styles.MainContainer}>
        {!isPad && (
          <div className={styles.FilterBox}>
            <NameFilter onSearch={handleSearch} />
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
        )}

        <div className={styles.ListBox}>
          {filteredList.length > 0 ? (
            <section className={styles.Items}>
              {filteredList.map((item) => (
                <DomainItem data={item} key={item.id} />
              ))}
            </section>
          ) : (
            <div className={styles.NoResults}>
              <Image
                src='../images/err-img.svg'
                alt='No Results'
                width={200}
                height={170}
              />
              <p>დომენი ვერ მოიძებნა</p>
              <span>
                მითითებული პარამეტრებით დომენების მარკეტში შედეგები ვერ
                მოიძებნა, შეცვალეთ ძიების პარამეტრები და ცადეთ თავიდან
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
