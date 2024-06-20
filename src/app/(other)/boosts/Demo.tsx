'use client';
import { BaseButton } from '@/components';
import { useTelegramBackButton } from '@/hooks';
import { initInitData } from '@tma.js/sdk';
import { useEffect } from 'react';

const Demo = () => {
  useTelegramBackButton();
  useEffect(() => {
    const initData = initInitData();
    console.log('initData :>> ', initData);
    console.log(' window.Telegram.WebApp.initData :>> ', window.Telegram.WebApp.initData);
  }, []);
  return (
    <div>
      <BaseButton>想机器人发送数据</BaseButton>
    </div>
  );
};

export default Demo;
