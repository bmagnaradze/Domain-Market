// import { FC, useState } from 'react';
// import Image from 'next/image';
// import styles from './domain.module.scss';
// import { Domain } from '@/app/core/types/domain.types';

// interface domainProps {
//   data: Domain;
// }

// export const DomainItem: FC<domainProps> = ({ data }) => {
//   const [hovered, setHovered] = useState(false);
//   const [clicked, setClicked] = useState(false);

//   const handleMouseEnter = () => {
//     setHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setHovered(false);
//   };

//   const handleClick = () => {
//     setClicked(!clicked);
//   };
//   return (
//     <div className={styles.DomainItems}>
//       <div className={styles.lefttSec}>
//         <Image src='../images/Btn_send.svg' alt='img' width={36} height={36} />
//         <span className={styles.domainName}>{data.domain}</span>
//       </div>
//       <div className={styles.rightSec}>
//         <div className={styles.priceBox}>
//           <div className={styles.priceGel}> {data.priceGel}</div>
//           <div className={styles.priceUsd}> {data.priceUsd}</div>
//         </div>

//         <div
//           className={`${styles['hoverDiv']} ${hovered ? styles.hovered : ''} ${
//             clicked ? styles.clicked : ''
//           }`}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onClick={handleClick}
//         >
//           {hovered && !clicked && <span className={styles.text}>დამატება</span>}
//           {clicked && <span className={styles.textClicked}>კალთაშია</span>}
//           <Image
//             src='../images/cartWhite.svg'
//             alt='img'
//             width={20}
//             height={16}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './domain.module.scss';
import { Domain } from '@/app/core/types/domain.types';

interface domainProps {
  data: Domain;
}

export const DomainItem: FC<domainProps> = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [iconClicked, setIconClicked] = useState(false); // Add iconClicked state

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
    setIconClicked(!iconClicked); // Toggle the icon state
  };

  return (
    <section className={styles.DomainItems}>
      <div className={styles.lefttSec}>
        <Image src='../images/Btn_send.svg' alt='img' width={36} height={36} />
        <span className={styles.domainName}>{data.domain}</span>
      </div>
      <div className={styles.rightSec}>
        <div className={styles.priceBox}>
          <div className={styles.priceGel}> {data.priceGel}</div>
          <div className={styles.priceUsd}> {data.priceUsd}</div>
        </div>

        <div
          className={`${styles.hoverDiv} ${hovered ? styles.hovered : ''} ${
            clicked ? styles.clicked : ''
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {hovered && !clicked && <span className={styles.text}>დამატება</span>}
          {clicked && <span className={styles.textClicked}>კალთაშია</span>}
          <Image
            src={
              iconClicked
                ? '../images/check-icon.svg'
                : '../images/cartWhite.svg'
            }
            alt='img'
            width={iconClicked ? 20 : 16}
            height={iconClicked ? 20 : 16}
          />
        </div>
      </div>
    </section>
  );
};
