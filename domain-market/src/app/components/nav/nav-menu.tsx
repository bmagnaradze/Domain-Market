import styles from '../nav/nav-menu.module.scss';

export default function Nav() {
  return (
    <div className={styles.NavContainer}>
      <div className={styles.NavContent}>
        <div className={styles.NavMenu}>
          <div>დომენი</div>
          <div>ტრანსფერი</div>
          <div>ჰოსტინგი</div>
          <div>Gmail</div>
          <div>ვებგვერდი</div>
          <div>დომენის მარკეტი</div>
        </div>
        <div className={styles.NavMenu}>
          <div>ჩვენს შესახებ</div>
          <div>ფასები</div>
          <div>ბლოგი</div>
          <div>დახმარება</div>
        </div>
      </div>
    </div>
  );
}
