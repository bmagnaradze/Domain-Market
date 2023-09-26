import { FC } from 'react';
import Image from 'next/image';
import styles from './domain.module.scss';
import { Domain } from '@/app/core/types/domain.types';

interface domainProps {
  data: Domain;
}

export const DomainItem: FC<domainProps> = ({ data }) => {
  return (
    <div>
      <div>
        <Image src='../images/Btn_send.svg' alt='img' width={28} height={19} />
        <span>{data.domain}</span>
      </div>
      <div></div>
    </div>
  );
};
