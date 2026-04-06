'use client'
import styles from "../styles/foundational/header/Header.module.scss";
import Link from "next/link";
import { useTheme, THEMES } from "@lib/ThemeContext";

const THEME_LABELS = {
  spring: '🌸',
  spoopy: '👻',
};

const Header = () => {
  const { theme, setTheme } = useTheme();

  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Link className={styles.link} href="/">
          {'notes <3'}
        </Link>
        <Link className={styles.link} href="/Frog">
          frogs :)
        </Link>
        <Link className={styles.link} href="/Spoopy">
          {"\u{1F47B}"}
        </Link>
        <button
          className={styles.themeToggle}
          onClick={() => setTheme(nextTheme)}
          title={`Switch to ${nextTheme} theme`}
          aria-label={`Switch to ${nextTheme} theme`}
        >
          {THEME_LABELS[nextTheme]}
        </button>
      </div>
    </div>
  );
};

export default Header;
