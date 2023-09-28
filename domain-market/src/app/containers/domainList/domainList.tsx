'use client';

import { DomainItem } from '@/app/components/domain/domain';
import { fetchDomain } from '@/app/core/services/domain.service';
import styles from './domainList.module.scss';
import { Domain } from '@/app/core/types/domain.types';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useMediaQuery from '@/app/core/hooks/useMediaHook';
import { breakpointsMax } from '@/app/core/helpers/breakpoints';
import FilterControl from '@/app/containers/filtercontrol/filtercontrol';

import FilterPopup from '@/popups/filterpopup/filterpopup';
import { IDomainFilter } from '@/app/core/types/filter.type';
import { domainFilter } from '@/app/core/helpers/filter';

export default function DomainList() {
  const [domain, setDomain] = useState<Domain[]>([]);

  const [activeSpan, setActiveSpan] = useState(0);
  const [filteredItems, setFilteredItems] = useState<Domain[]>(domain);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const isPad = useMediaQuery(breakpointsMax.medium);

  useEffect(() => {
    let isMounted = true;

    async function getData() {
      try {
        const data = await fetchDomain();
        if (isMounted) {
          setFilteredItems(data);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  const onSearch = (filters: IDomainFilter) => {
    const filterdList = domainFilter(domain, filters);
    setFilteredItems(filterdList);
  };

  const handleSpanClick = (index: any) => {
    setActiveSpan(index);
  };

  const handlePopupClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

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
            <button onClick={handlePopupClick}>
              სორტირება
              <Image
                src='../images/Dropdown.svg'
                alt='logo'
                width={9}
                height={6}
              />
            </button>
            <button onClick={handlePopupClick}>
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
            <FilterControl
              onSearch={onSearch}
              minPrice={0}
              maxPrice={0}
              priceValues={[]}
              domain={domain}
            />
          </div>
        )}

        {filteredItems.length > 0 ? (
          <div className={styles.ListBox}>
            <section className={styles.Items}>
              {filteredItems.map((item) => (
                <DomainItem data={item} key={item.id} />
              ))}
            </section>
          </div>
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
              მითითებული პარამეტრებით დომენების მარკეტში შედეგები ვერ მოიძებნა,
              შეცვალეთ ძიების პარამეტრები და ცადეთ თავიდან
            </span>
          </div>
        )}
      </div>

      <div className={isPopupVisible ? styles.shown : styles.hidden}>
        <FilterPopup
          onClose={handlePopupClick}
          onFilterApply={onSearch}
          domain={domain}
        />
      </div>
    </>
  );
}
