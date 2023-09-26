import styles from '../banner/banner.module.scss';

export default function Banner() {
  return (
    <div className={styles.BannerBox}>
      <div className={styles.BannerSec}>
        <p className={styles.BannerTxt}>გაყიდე და იყიდე დომენი მარტივად</p>
      </div>
    </div>
  );
}
