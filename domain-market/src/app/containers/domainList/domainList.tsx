'use client';

import { DomainItem } from '@/app/components/domain/domain';
import { fetchDomain } from '@/app/core/services/domain.service';
import styles from './domainList.module.scss';
import { Domain } from '@/app/core/types/domain.types';
import React, { useEffect, useState } from 'react';

export default function DomainList() {
  const [domain, setDomain] = useState<Domain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true; // This flag helps to handle cleanup

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
      isMounted = false; // Cleanup to prevent state updates on unmounted component
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const box = domain.map((item) => {
    return <DomainItem data={item} key={item.id} />;
  });

  return (
    <div className={styles.MainContainer}>
      <div className={styles.FilterBox}>Filter</div>
      <div className={styles.ListBox}>
        <section className={styles.test}>{box}</section>
      </div>
    </div>
  );
}
