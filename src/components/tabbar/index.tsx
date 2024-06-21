'use client';
import { NativeProps, withNativeProps } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, memo } from 'react';
import './index.css';

export interface TabbarProps extends NativeProps {}
const Tabbar: FC<TabbarProps> = memo((props) => {
  const pathname = usePathname();
  const renderIcon = useMemoizedFn((name: string) => {
    const path = `/${name}`;

    return (
      <Link href={path} className="flex flex-col px-[23px] ">
        <Image
          src={!pathname.includes(path) ? `/icons/${name}.svg` : `/icons/${name}-active.svg`}
          width={32}
          height={32}
          alt="tabbar"
          className="mt-[2px]"
        />
      </Link>
    );
  });

  return withNativeProps(
    props,
    // <div className="z-100 fixed bottom-0 left-0 flex h-[50px] w-full items-center  justify-between bg-black py-6">
    <div className="tabbar-container">
      {renderIcon('main')}
      {renderIcon('social')}
      {renderIcon('map')}
      {renderIcon('earn')}
      {renderIcon('me')}
    </div>,
  );
});
Tabbar.displayName = 'Tabbar';
export { Tabbar };
