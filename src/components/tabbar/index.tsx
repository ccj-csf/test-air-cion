'use client';
import { NativeProps, withNativeProps } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC, memo } from 'react';

export interface TabbarProps extends NativeProps {}
const Tabbar: FC<TabbarProps> = memo((props) => {
  const pathname = usePathname();
  const router = useRouter();
  const renderIcon = useMemoizedFn((name: string) => {
    const path = `/${name}`;

    const handleClick = () => {
      window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('heavy');
      router.push(path);
    };
    return (
      <div className="flex flex-col px-[23px]" onClick={handleClick}>
        <Image
          src={!pathname.includes(path) ? `/icons/${name}.svg` : `/icons/${name}-active.svg`}
          width={32}
          height={32}
          alt="tabbar"
          className="mt-[2px]"
        />
      </div>
    );
  });

  return withNativeProps(
    props,
    <div className="z-100 fixed bottom-0 left-0 flex  w-full items-center  justify-between bg-black pb-6 pt-2">
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
