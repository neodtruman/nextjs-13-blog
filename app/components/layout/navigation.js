'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import styles from './navigation.module.css';

export default function Navigation() {
  const { signout } = useAuth();
  const router = useRouter();

  const signoutHandler = () => {
    signout();
    router.push('/');
  };

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
            <Link href="/admin/create-post" className={styles['nav-link']}>
              Create Post
            </Link>
          </li>
          <li>
            <span className={styles['nav-link']} onClick={signoutHandler}>
              Sign Out
            </span>
          </li>
          <li>
            <Link href="/login" className={styles['nav-link']}>
              Sign In
            </Link>
          </li>
          <li>
            <Link href="/signup" className={styles['nav-link']}>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
