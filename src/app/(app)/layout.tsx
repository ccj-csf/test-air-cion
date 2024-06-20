import { Tabbar } from '@/components';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'telegram miniapp',
  description: 'telegram miniapp',
};

export const runtime = 'edge';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="pb-[80px]">{children}</div>
      <Tabbar />
    </main>
  );
}
