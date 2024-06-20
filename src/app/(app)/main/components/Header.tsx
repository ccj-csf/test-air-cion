'use client';

import { BaseButton, Icon } from '@/components';
import { GROUP_LEVEL, ROUTES_SOCIAL } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  const groupInfo = {
    name: 'Squad',
    level: 'Bronze',
  };
  return (
    <header className="mt-6 flex items-center justify-center px-4">
      {groupInfo.name ? (
        <BaseButton
          className="flex w-full items-center justify-center  bg-gray-400"
          variant="custom"
        >
          <Link href={ROUTES_SOCIAL} className="flex w-full items-center justify-between ">
            <div className="flex items-center space-x-2">
              <Image src="/icons/coin1.svg" alt="squad" width={20} height={20} />
              <span className="text-16">{groupInfo.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src={GROUP_LEVEL[groupInfo.level].icon}
                width={16}
                height={16}
                alt="user-level"
              />
              <span>{GROUP_LEVEL[groupInfo.level].desc}</span>
            </div>
          </Link>
        </BaseButton>
      ) : (
        <BaseButton
          className="flex w-full items-center justify-center  bg-gray-400"
          variant="custom"
        >
          <Link href={ROUTES_SOCIAL} className="space-x-2">
            <span className="text-16">Join squad</span>{' '}
            <Icon name="right-arrow" className="!text-12px text-gray-700"></Icon>
          </Link>
        </BaseButton>
      )}
    </header>
  );
};

export default Header;
