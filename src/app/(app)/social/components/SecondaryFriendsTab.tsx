import { BaseButton, BaseEmpty, BaseTabs, Icon, SkeletonList } from '@/components';
import { USER_LEVEL } from '@/constants';
import { formatNumberToK, formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface IUser {
  id: number;
  name: string;
  avatarUrl: string;
  level: string;
  coins: number;
  score: number;
  isMember: boolean;
}

interface FriendsProps {
  users: IUser[];
  loading: boolean;
}
export type INftCategory =
  | 'Free Mint Air ID'
  | 'Join Air Force Club'
  | 'Join Air Force Founding Club';
const Friends: React.FC<FriendsProps> = ({ users, loading }) => {
  if (users?.length === 0 || loading) {
    return (
      <div className="px-4">
        <SkeletonList />
      </div>
    );
  }
  return (
    <main className="space-y-5  px-4">
      {!loading && users.length > 0 ? (
        users?.map((user) => (
          <div key={user.id} className="flex space-x-3 py-2">
            <section className="relative inline-block">
              <Image
                src={user.avatarUrl}
                width={48}
                height={48}
                alt="avatar"
                className="rounded-full"
              />
              {user.isMember && (
                <Image
                  src="/icons/member.svg"
                  width={24}
                  height={24}
                  alt="member icon"
                  className="absolute -top-3 right-3"
                />
              )}
            </section>
            <section className="flex flex-1 items-center justify-between">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium">{user.name}</span>
                <div className="flex items-center space-x-2 text-xs">
                  <Image
                    src={USER_LEVEL[user.level].icon}
                    width={16}
                    height={16}
                    alt="user-level"
                  />
                  <span>{USER_LEVEL[user.level].desc}</span>
                  <Image src="/icons/coin1.svg" width={16} height={16} alt="coin" />
                  <span>{formatNumberWithCommas(user.coins)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 self-start text-lg font-medium">
                <span>{formatNumberToK(user.score)}</span>
                <Icon name="right-arrow" className="!text-base text-gray-700" />
              </div>
            </section>
          </div>
        ))
      ) : (
        <BaseEmpty></BaseEmpty>
      )}
    </main>
  );
};

const FriendsOfFriends: React.FC<{ nftType: INftCategory }> = ({ nftType }) => {
  return (
    <div className="mt-36 h-[300px] ">
      <BaseButton variant="custom" className="w-full">
        {nftType}
      </BaseButton>
    </div>
  );
};

const defaultUsers = [
  {
    id: 1,
    name: 'David',
    avatarUrl: 'https://github.com/david.png',
    level: 'Stubborn Bronze',
    coins: 10,
    score: 1234561,
    isMember: true,
  },
  {
    id: 2,
    name: 'Alice',
    avatarUrl: 'https://github.com/alice.png',
    level: 'Order Silver',
    coins: 20,
    score: 71234561,
    isMember: false,
  },
  {
    id: 3,
    name: 'Bob',
    avatarUrl: 'https://github.com/bob.png',
    level: 'Glory Gold',
    coins: 30,
    score: 123456165,
    isMember: false,
  },
  {
    id: 4,
    name: 'Charlie',
    avatarUrl: 'https://github.com/charlie.png',
    level: 'Noble Platinum',
    coins: 40,
    score: 934561,
    isMember: false,
  },
];

const SecondaryFriendsTab = () => {
  // 当前nft类型
  const [nftType, setNftType] = useState<INftCategory>('Free Mint Air ID');
  const [activeKey, setActiveKey] = useState('Friends List');
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const handleTabChange = (key: string) => {
    console.log('Active Tab:', key);
    setActiveKey(key);
  };
  const tabs = [
    {
      key: 'Friends List',
      label: 'Friends List',
      component: (
        <div className="mt-4">
          <Friends users={users} loading={loading} />
        </div>
      ),
    },
    {
      key: 'Friends of Friends',
      label: 'Friends of Friends',
      component: (
        <div className="mt-4">
          <FriendsOfFriends nftType={nftType}></FriendsOfFriends>
        </div>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      console.log('请求Friends数据 :>> ');
      setUsers(defaultUsers);
      setLoading(false);
    }, 1500);
  }, [activeKey]);
  return (
    <main className="relative mt-4 rounded-14 bg-gray-400 py-4 ">
      <BaseTabs activeKey={activeKey} tabs={tabs} onChange={handleTabChange}></BaseTabs>
      <Image
        src="/icons/member.svg"
        width={24}
        height={24}
        alt="member icon"
        className="absolute right-3 top-0"
      />
    </main>
  );
};

export default SecondaryFriendsTab;
