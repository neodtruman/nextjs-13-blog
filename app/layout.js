import Navigation from './components/layout/navigation';
import './globals.css';
import { Inter } from 'next/font/google';
import AuthContext from './context/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Cool Blog',
  description: 'This is My Cool Blog',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Navigation />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
