'use client'
import styles from "../styles/foundational/header/Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Link className={styles.link} href="/">
          {'pet :)'}
        </Link>
        <Link className={styles.link} href="/Frog">
          frogs :)
        </Link>
      {/*   <Link className={styles.link} href="/Spoopy">
          {"\u{1F47B}"}
        </Link> */}
      </div>
    </div>
  );
};

export default Header;
