import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Картриджи макеевкокс | Admin',
  description: 'Управление картриджами | Администрирование',
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className='container mx-auto p-6'>{children}</main>;
}
