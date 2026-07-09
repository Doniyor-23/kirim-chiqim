import './globals.css';
import AppShell from '../components/layout/AppShell';

export const metadata = {
  title: 'RestoFinance — Restaurant Finance Dashboard',
  description: 'Manage your restaurant income, expenses, and cash flow in one place.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
