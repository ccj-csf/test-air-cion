import { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'telegram miniapp',
  description: 'telegram miniapp',
};
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
