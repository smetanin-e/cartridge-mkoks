import type { Metadata } from 'next';
import { Header } from '@/shared/components';

export const metadata: Metadata = {
  title: 'Картриджи макеевкокс',
  description: 'Управление картриджами',
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='container mx-auto p-6'>
      <Header />
      {children}
    </main>
  );
}
