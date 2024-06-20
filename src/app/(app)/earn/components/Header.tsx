'use client';

import { Icon } from '@/components';
import { Check } from 'lucide-react';
import Image from 'next/image';

const Header = () => {
  return (
    <>
      <header className="mt-4 flex flex-col items-center space-y-4">
        <Image src="/icons/coin1.svg" alt="coin1" width={92} height={96} />
        <h2 className="font-700 text-24">Earn more coins</h2>
        <p className="font-500 text-14 text-blue">Full guide</p>
      </header>
      <section className="mt-8 flex  space-x-6 rounded-14 bg-gray-400 px-[30px] py-7">
        <Image src="/icons/rewards.svg" alt="coin2" width={32} height={32} />
        <div className="flex  flex-1 justify-between">
          <div className="flex flex-col space-y-2">
            <span className="font-500 text-14 text-gray-100">Invite bonus</span>
            <div className="flex items-center space-x-2  text-12 text-gray-100">
              <span className=" font-600 text-white">up to 100k</span>
              <Image src="/icons/coin1.svg" alt="coin1" width={16} height={16} />
              <span>for friend</span>
            </div>
          </div>
          {false ? (
            <Check className="self-center" />
          ) : (
            <Icon name="right-arrow" className="self-center  text-gray-200"></Icon>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
