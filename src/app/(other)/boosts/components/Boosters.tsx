'use client';

import { BaseButton, Icon } from '@/components';
import BaseSlideUpModal, { SlideUpModalRef } from '@/components/base-slide-up-modal';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

type BoosterItemType = 'Recharging speed' | 'Energy Limit' | 'Wind Level';

interface BoosterItemComponentProps {
  booster: BoosterItem;
  onClick?: () => void; // 添加 onClick 属性
}
// 定义列表项的类型
interface BoosterItem {
  iconName: string;
  title: string;
  coins: number;
  level: string;
  type: BoosterItemType;
}

interface ModalContent {
  title: string;
  icon: string;
  levelDescription: string;
  limitUpdate: string;
  coins: number;
  level: string;
}

// 测试数据
const defaultBoosterData: BoosterItem[] = [
  {
    iconName: '/icons/lightning2.svg',
    title: 'Recharging speed',
    coins: 2000,
    level: `Lv${1}`,
    type: 'Recharging speed',
  },
  {
    iconName: '/icons/masonry1.svg',
    title: 'Energy Limit',
    coins: 3000,
    level: `Lv${1}`,
    type: 'Energy Limit',
  },
  {
    iconName: '/icons/wind1.svg',
    title: 'Wind Level',
    coins: 1500,
    level: `Lv${1}`,
    type: 'Wind Level',
  },
];

const defaultModalContents: Record<BoosterItemType, ModalContent> = {
  'Recharging speed': {
    title: 'Recharging Speed',
    icon: '/icons/lightning1.svg',
    levelDescription: 'from level 1 to level 2',
    limitUpdate: 'limit update to 3000',
    coins: 2000,
    level: 'Lv2',
  },
  'Energy Limit': {
    title: 'Energy Limit',
    icon: '/icons/masonry1.svg',
    levelDescription: 'from level 2 to level 3',
    limitUpdate: 'limit update to 4500',
    coins: 3000,
    level: 'Lv3',
  },
  'Wind Level': {
    title: 'Wind Level',
    icon: '/icons/wind1.svg',
    levelDescription: 'from level 1 to level 2',
    limitUpdate: 'limit update to 2500',
    coins: 1500,
    level: 'Lv2',
  },
};

const Boosters = () => {
  const [modalType, setModalType] = useState<BoosterItemType>('Recharging speed');
  const modalRef = useRef<SlideUpModalRef>(null);
  const [boosterData, setBoosterData] = useState(defaultBoosterData);
  const [modalContents, setModalContents] = useState<ModalContent>(
    defaultModalContents['Recharging speed'],
  );
  const [currentLevel, setCurrentLevel] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      const level = 1;
      setCurrentLevel(level);
      const newBoosterData = boosterData.map((booster) => {
        return {
          ...booster,
          level: `Lv${level}`,
        };
      });
      setBoosterData(newBoosterData);
    }, 1000);
  }, []);
  const handleClose = () => {
    modalRef.current?.close();
  };
  const handleClickOpen = (type: BoosterItemType) => {
    console.log('1111 :>> ', 1111);
    setModalType(type);
    const currentDialogContent = defaultModalContents[type];
    currentDialogContent.levelDescription = `from level ${currentLevel} to level ${currentLevel + 1}`;
    currentDialogContent.level = `level ${currentLevel + 1}`;
    setModalContents(currentDialogContent);
    modalRef.current?.open();
  };
  return (
    <main>
      <h2 className="font-600 mb-2 mt-8 text-20">Boosters</h2>
      <div className="space-y-10 rounded-14 bg-gray-400 px-8 py-7 text-12 text-[#B4B4B8]">
        {boosterData.map((booster, index) => (
          <BoosterItemComponent
            key={index}
            booster={booster}
            onClick={() => handleClickOpen(booster.type)}
          />
        ))}
      </div>
      <BaseSlideUpModal ref={modalRef}>
        <main className="mt-4 flex flex-col items-center px-8">
          <h2 className="font-700 text-24">{modalContents?.title}</h2>
          <Image
            src={modalContents?.icon}
            alt="icon"
            width={78}
            height={90}
            className="mb-2 mt-6"
          />
          <p className="text-14">{modalContents?.levelDescription}</p>
          <p className="text-14">{modalContents?.limitUpdate}</p>
          <div className="mb-7 mt-6 flex items-center space-x-4">
            <Image src="/icons/coin1.svg" alt="coin icon" width={42} height={42} />
            <span className="font-700 text-24">{modalContents?.coins}</span>
            <span className="text-gray-700">{modalContents?.level}</span>
          </div>
          <BaseButton className="w-full" onClick={() => modalRef.current?.close()}>
            OK
          </BaseButton>
        </main>
      </BaseSlideUpModal>
    </main>
  );
};

// 单独的组件用于渲染每一个列表项
const BoosterItemComponent: React.FC<BoosterItemComponentProps> = ({ booster, onClick }) => {
  return (
    <section className="flex space-x-7" onClick={onClick}>
      <Image width={32} height={32} src={booster.iconName} alt="booster icon" />
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="font-500 text-14">{booster.title}</span>
          <div className="flex items-center space-x-1">
            <Image width={16} height={16} src="/icons/coin1.svg" alt="coin icon" />
            <span className="font-600 text-white">{booster.coins}</span>
            <span>{booster.level}</span>
          </div>
        </div>
        <Icon name="right-arrow" className="text-gray-700"></Icon>
      </div>
    </section>
  );
};

export default Boosters;
