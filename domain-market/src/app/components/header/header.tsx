import styles from '../header/header.module.scss';
import Image from 'next/image';
export default function Header() {
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <div className={styles.Logo}>
          <Image src='../images/logo.svg' alt='logo' width={182} height={28} />
        </div>
        <div className={styles.ProfileSec}>
          <div className={styles.Box}>
            <Image
              src='../images/notify-icon.svg'
              alt='logo'
              width={16}
              height={20}
            />
          </div>
          <div className={styles.Cart}>
            <Image
              src='../images/cart-icon.svg'
              alt='img'
              width={21}
              height={19}
            />
            <div className={styles.Count}>3</div>
          </div>
          <div className={styles.UserName}>
            <Image
              src='../images/profile-icon.svg'
              alt='img'
              width={20}
              height={20}
            />
            <span>Kancha Co.</span>
            <Image
              src='../images/arrow-down.svg'
              alt='img'
              width={8}
              height={5}
            />
          </div>
          <div className={styles.Box}>
            <Image
              src='../images/flag-icon.svg'
              alt='img'
              width={28}
              height={19}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
