import Link from 'next/link';
import styles from './navigation.module.css';

export default function Navigation() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles['nav-link']}>
        HOME
      </Link>

      <nav>
        <ul>
          <li>
            <Link href="/posts" className={styles['nav-link']}>
              Posts
            </Link>
          </li>
          <li>
            <Link href="/login" className={styles['nav-link']}>
              Sign In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
