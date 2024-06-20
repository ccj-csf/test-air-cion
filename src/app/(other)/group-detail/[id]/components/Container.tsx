'use client';

import { RankingUserList } from '@/biz-components';
import { IRankingUserList } from '@/biz-components/ranking-user-list';
import { BaseButton, BaseDialog, BaseTabs } from '@/components';
import { DialogRef } from '@/components/base-dialog';
import { useTelegram } from '@/hooks';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
const defaultUsers = [
  {
    username: 'Gladys',
    imageUrl: 'https://github.com/shadcn.png',
    fallbackText: 'CN',
    score: 101244,
  },
  { username: 'Alice', imageUrl: 'https://github.com/alice.png', fallbackText: 'AL', score: 92410 },
  { username: 'Bob', imageUrl: 'https://github.com/bob.png', fallbackText: 'BO', score: 81000 },
  {
    username: 'Charlie',
    imageUrl: 'https://github.com/charlie.png',
    fallbackText: 'CH',
    score: 70000,
  },
  { username: 'David', imageUrl: 'https://github.com/david.png', fallbackText: 'DA', score: 50000 },
  { username: 'Eve', imageUrl: 'https://github.com/eve.png', fallbackText: 'EV', score: 30000 },
  { username: 'Frank', imageUrl: 'https://github.com/frank.png', fallbackText: 'FR', score: 20000 },
  { username: 'Grace', imageUrl: 'https://github.com/grace.png', fallbackText: 'GR', score: 10000 },
  { username: 'Holly', imageUrl: 'https://github.com/holly.png', fallbackText: 'HO', score: 5000 },
  { username: 'Ivy', imageUrl: 'https://github.com/ivy.png', fallbackText: 'IV', score: 3000 },
];

const Container = () => {
  const { id } = useParams();
  const { handleInviteFriend } = useTelegram();

  // 是否加入群组
  const [isJoined, setIsJoined] = useState(true);
  const [users, setUsers] = useState<IRankingUserList[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('Day');
  const dialogRef = useRef<DialogRef>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log('请求Friends数据 :>> ', id);
      setUsers(defaultUsers);
      setLoading(false);
    }, 1500);
  }, [activeKey, id]);

  const handleTabChange = (key: string) => {
    console.log('Active Tab:', key);
    setUsers([]);
    setActiveKey(key);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUsers(defaultUsers);
    }, 1500);
  };

  const handleJoinGroup = () => {};
  const handleLeaveGroup = () => {
    dialogRef.current?.open();
  };
  const handleConfirm = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  };
  const tabs = [
    {
      key: 'Day',
      label: 'Day',
      component: (
        <div className=" px-4">
          <RankingUserList items={users} loading={loading} />
        </div>
      ),
    },
    {
      key: 'Week',
      label: 'Week',
      component: (
        <div className=" px-4">
          <RankingUserList items={users} loading={loading} />
        </div>
      ),
    },
  ];

  return (
    <main className="mt-4 space-y-6 px-4">
      <section className="rounded-14 bg-gray-400 px-4 pb-4 pt-8">
        <h2 className="font-700 text-center text-24">League of June 2024</h2>
        <div className="mt-6 flex space-x-4">
          <Image
            src="https://github.com/david.png"
            alt="League of June 2024"
            width={66}
            height={66}
            className=" self-start rounded-full"
          />
          <section className="flex flex-col space-y-2">
            <h3 className="font-700 text-20">name</h3>
            <div className="flex items-center space-x-2 text-12 text-gray-100">
              <Image src="/icons/group-level1.svg" width={16} height={16} alt="user-level" />
              <span>Bronze</span>
            </div>
            <div className="font-700 flex items-center space-x-2 text-20">
              <Image src="/icons/coin1.svg" width={24} height={24} alt="coin1" />
              <span>{formatNumberWithCommas(15780123)}</span>
            </div>
          </section>
        </div>
        <div className="mt-4 flex flex-col space-y-4">
          <BaseButton onClick={() => handleInviteFriend()}>Invite a friend</BaseButton>
          {isJoined ? (
            <BaseButton variant="custom" onClick={handleLeaveGroup}>
              Leave squad
            </BaseButton>
          ) : (
            <BaseButton variant="custom" onClick={handleJoinGroup}>
              Join
            </BaseButton>
          )}
        </div>
        <BaseDialog
          ref={dialogRef}
          onConfirm={handleConfirm}
          title={<div className="text-red-500">Are you sure to leave?</div>}
        ></BaseDialog>
      </section>
      <section className="rounded-14 bg-gray-400 p-4 px-0">
        <BaseTabs activeKey={activeKey} tabs={tabs} onChange={handleTabChange}></BaseTabs>
      </section>
    </main>
  );
};

export default Container;
