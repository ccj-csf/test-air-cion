'use client';
import { RankingUserList } from '@/biz-components';
import { IRankingUserList } from '@/biz-components/ranking-user-list';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ImageSlider, { IImageItem } from './components/SliderImage';

const images = [
  { url: '/icons/user-level1.svg', alt: 'Stubborn Bronze', level: 'Level 1', grade: 10000 },
  { url: '/icons/user-level2.svg', alt: 'Order Silver', level: 'Level 2', grade: 1000000 },
  { url: '/icons/user-level3.svg', alt: 'Glory Gold', level: 'Level 3', grade: 5000000 },
  { url: '/icons/user-level4.svg', alt: 'Noble Platinum', level: 'Level 4', grade: 10000000 },
  { url: '/icons/user-level5.svg', alt: 'Eternal Diamond', level: 'Level 5', grade: 30000000 },
  { url: '/icons/user-level6.svg', alt: 'Supreme Star', level: 'Level 6', grade: 50000000 },
  { url: '/icons/user-level7.svg', alt: 'Glory King', level: 'Level 7', grade: 100000000 },
];

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
const UserLevel = () => {
  const [currentGrade, setCurrentGrade] = useState<IImageItem>(images[0]);
  const [userList, setUserList] = useState<IRankingUserList[]>([]);
  const [loading, setLoading] = useState(false);
  const handleImageChange = (currentIndex: number, currentImage: IImageItem) => {
    setUserList([]);
    setCurrentGrade(currentImage);
    const randomCount = Math.floor(
      Math.random() * (currentIndex + 1) * (defaultUsers.length / images.length),
    );

    // 生成随机用户列表
    const randomUsers = defaultUsers.slice(0, randomCount);
    setLoading(true);
    setTimeout(() => {
      setUserList(randomUsers);
      setLoading(false);
    }, 1500);
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setUserList(defaultUsers);
    }, 1500);
  }, []);
  return (
    <main className="px-4">
      <ImageSlider images={images} onImageChange={handleImageChange} />
      <h2 className="font-700 -mt-16 text-center text-24">{currentGrade?.alt}</h2>
      <section className="mt-4 flex items-center justify-center space-x-2 text-20">
        <Image src="/icons/coin1.svg" alt="coin1" width={24} height={25} />
        <span>{formatNumberWithCommas(500)}</span>
        <span className="text-gray-100">/</span>
        <span className="text-16 text-gray-100">{formatNumberWithCommas(currentGrade?.grade)}</span>
      </section>
      <section className="mt-8">
        <RankingUserList items={userList} loading={loading}></RankingUserList>
      </section>
    </main>
  );
};

export default UserLevel;
