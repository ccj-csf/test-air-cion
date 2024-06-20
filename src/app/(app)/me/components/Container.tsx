'use client';
import { Icon, SkeletonMe } from '@/components';
import { ROUTES_USER_LEVEL, USER_LEVEL } from '@/constants';
import { formatNumberWithCommas } from '@/utils';
import { SquareMenu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { INftCategory } from '../../social/components/SecondaryFriendsTab';
import Header from './Header';
import NftTask from './NftTask';
import Wallet from './Wallet';
// 个人中心数据结构
export interface IUser {
  twitterVerified: boolean;
  twitterName: string;
  telegramUsername: string;
  avatar: string;
  isMember: boolean;
  score: number;
  walletAddress: string;
  isLinkedWallet: boolean;
  level: string;
  increaseRate: number;
  isFollowingTwitter: boolean;
  isJoinTelegram: boolean;
  nftType: INftCategory;
}
const defaultUser: IUser = {
  twitterVerified: true,
  twitterName: 'ccj-x',
  telegramUsername: 'ccj-tg',
  avatar: 'https://github.com/david.png',
  isMember: true,
  score: 15780,
  walletAddress: '0x123456789',
  isLinkedWallet: true,
  level: 'Stubborn Bronze',
  increaseRate: 0.5,
  isFollowingTwitter: true,
  isJoinTelegram: true,
  nftType: 'Join Air Force Founding Club',
};
const Container = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const goUserLevelPage = () => {
    console.log('goUserLevelPage');
    router.push(ROUTES_USER_LEVEL);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser(defaultUser);
    }, 1500);
  }, []);
  return (
    <main className="flex flex-col  justify-center space-y-4">
      {loading ? (
        <SkeletonMe></SkeletonMe>
      ) : (
        <>
          <Header user={user} loading={loading}></Header>
          <Wallet user={user} loading={loading}></Wallet>
          <section className="flex items-center justify-between rounded-14 bg-gray-400 px-3 py-4">
            <div className="flex  items-center space-x-2 text-16">
              <Image
                src={user ? USER_LEVEL[user.level]?.icon : ''}
                width={32}
                height={32}
                alt="user level"
              />
              <span>{user ? USER_LEVEL[user.level]?.desc : ''}</span>
            </div>
            <div
              className="flex items-center space-x-2 text-12 text-gray-100"
              onClick={goUserLevelPage}
            >
              <span>View</span>
              <Icon name="right-arrow" className="!text-12"></Icon>
            </div>
          </section>
          <section className="relative space-y-2 rounded-14 bg-gray-400 px-3 py-4">
            <div className="flex items-center justify-between text-14 text-gray-100">
              <span>Coin Balance</span>
              <SquareMenu size={14} />
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/icons/coin1.svg" width={30} height={30} alt="coin1" />
              <span className="text-24 font-bold"> {formatNumberWithCommas(user?.score)}</span>
            </div>
            <div className="absolute bottom-4 right-4 text-14 text-yellow">
              <span className="font-bold">+{user?.increaseRate}%</span>
              <span className="text-gray-100">/24h</span>
            </div>
          </section>
          <NftTask user={user} loading={loading}></NftTask>
        </>
      )}
    </main>
  );
};
export default Container;
