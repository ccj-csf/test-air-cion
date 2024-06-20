'use client';

import { BaseButton, BasePopover, BaseTabs } from '@/components';
import { ROUTES_GROUP_LIST } from '@/constants';
import { useTelegram } from '@/hooks';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Friends = () => {
  return (
    <div className="relative px-4">
      <h2 className="mt-4 text-center text-2xl font-bold">Build Together!</h2>
      <section className="mt-6 flex items-center justify-between px-10 text-lg font-bold">
        <div className="space-x-2">
          <span>2</span>
          <span>Friends</span>
        </div>
        <div className="flex items-center space-x-2">
          <Image src="/icons/coin1.svg" width={16} height={16} alt="coin" />
          <span>+</span>
          <span>{formatNumberWithCommas(15780)}</span>
        </div>
      </section>
      <div className="absolute -top-2 right-2">
        <BasePopover content="This is content"></BasePopover>
      </div>
    </div>
  );
};

const Squad = () => {
  const router = useRouter();
  const { handleJoinGroup } = useTelegram();
  return (
    <div className="px-4">
      <h2 className="mt-4 text-center text-2xl font-bold">Join Squad</h2>
      <section className="mt-4 flex flex-col space-y-4">
        <BaseButton className="h-11" onClick={() => router.push(ROUTES_GROUP_LIST)}>
          Join another squad
        </BaseButton>
        <BaseButton variant="custom" className="h-11" onClick={handleJoinGroup}>
          Create a squad
        </BaseButton>
      </section>
    </div>
  );
};

interface TabsProps {
  currentKey: string;
  onChange: (key: string) => void;
}

const PrimaryTab: React.FC<TabsProps> = ({ currentKey, onChange }) => {
  const [activeKey, setActiveKey] = useState(currentKey || 'Friends');

  useEffect(() => {
    if (activeKey !== undefined) {
      setActiveKey(activeKey);
    }
  }, [activeKey]);

  const handleTabChange = (key: string) => {
    console.log('Active Tab:', key);
    setActiveKey(key);
    if (typeof onChange === 'function') {
      onChange(key);
    }
  };
  const tabs = [
    {
      key: 'Friends',
      label: 'Friends',
      component: <Friends></Friends>,
    },
    {
      key: 'Squad',
      label: 'Squad',
      component: <Squad></Squad>,
    },
  ];

  return (
    <main className="mt-4 rounded-xl bg-gray-400 pb-10 pt-4">
      <BaseTabs activeKey={activeKey} tabs={tabs} onChange={handleTabChange}></BaseTabs>
    </main>
  );
};

export default PrimaryTab;
