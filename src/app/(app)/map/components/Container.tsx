'use client';

import { formatNumberWithCommas } from '@/utils';
import Globe from './Globe';
import Tabs from './Tabs';

const Container = () => {
  return (
    <main className="px-4">
      <div className="flex justify-center">
        <Globe width={274} height={274} />
      </div>
      <div className="font-700 -mt-3 mb-3 flex flex-col items-center justify-center text-32">
        <span>{formatNumberWithCommas(3251715)}</span>
        <span>UNIQUE USERS</span>
      </div>
      <Tabs></Tabs>
    </main>
  );
};

export default Container;
