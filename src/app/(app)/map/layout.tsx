import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'telegram miniapp',
  description: 'telegram miniapp',
};

export const runtime = 'edge';

export default async function MapLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
