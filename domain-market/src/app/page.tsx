import Header from './components/header/header';
import Nav from './components/nav/nav-menu';
import styles from './globals.module.scss';

export default function Home() {
  return (
    <div>
      <Header />
      <Nav />
      <div className={styles.BannerSec}>გაყიდე და იყიდე დომენი მარტივად</div>
    </div>
  );
}
