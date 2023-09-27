import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './domain.module.scss';
import { Domain } from '@/app/core/types/domain.types';
import { useCart } from '../cart/cart';

interface DomainItemProps {
  data: Domain;
}

export const DomainItem: FC<DomainItemProps> = ({ data }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [iconClicked, setIconClicked] = useState(false);
  const { addToCart, removeFromCart, cart } = useCart();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setClicked(!clicked);
    setIconClicked(!iconClicked);

    const itemInCart = cart.find((item) => item.id === data.id);

    if (clicked) {
      if (itemInCart) {
        removeFromCart(data.id);
      }
    } else {
      if (!itemInCart) {
        addToCart(data);
      }
    }
  };

  return (
    <section
      className={`${styles.DomainItems} ${
        hovered ? styles.hoveredBackground : ''
      }`}
    >
      <div className={styles.lefttSec}>
        {hovered ? (
          <Image
            src='../images/Btn_green.svg'
            alt='img'
            width={36}
            height={36}
          />
        ) : (
          <Image
            src='../images/Btn_send.svg'
            alt='img'
            width={36}
            height={36}
          />
        )}
        <span className={styles.domainName}>{data.domainName}</span>
      </div>
      <div className={styles.rightSec}>
        <div className={styles.priceBox}>
          <div className={styles.priceGel}> {data.priceGel} ₾ </div>
          <div className={styles.priceUsd}> {data.priceUsd} $</div>
        </div>

        <div
          className={`${styles.hoverDiv} ${hovered ? styles.hovered : ''} ${
            clicked ? styles.clicked : ''
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          {clicked ? (
            <>
              <Image
                src={
                  iconClicked
                    ? '../images/check-icon.svg'
                    : '../images/cartWhite.svg'
                }
                alt='img'
                width={iconClicked ? 20 : 20}
                height={iconClicked ? 20 : 20}
              />
              <span className={styles.textClicked}>კალათაშია</span>
            </>
          ) : (
            <>
              <span className={styles.text}>დამატება</span>
              <Image
                src={
                  iconClicked
                    ? '../images/check-icon.svg'
                    : '../images/cartWhite.svg'
                }
                alt='img'
                width={iconClicked ? 20 : 20}
                height={iconClicked ? 20 : 20}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
