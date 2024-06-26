'use client';

import { BaseProgress, Icon } from '@/components';
import { ROUTES_BOOSTS, ROUTES_USER_LEVEL, USER_LEVEL } from '@/constants';
import { formatNumberWithCommas } from '@/utils';
// import { initInitData } from '@tma.js/sdk';
import { debounce } from 'lodash-es';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import FullscreenVideoModal from './FullscreenVideoModal';
import ImageSlider from './ImageSlider';
const defaultCoinBg = '/images/coin1-bg.png';

const coins = [
  {
    url: '/icons/coin1.svg',
    bgUrl: '/images/coin1-bg.png',
    isClocked: false,
  },
];
interface IPointUser {
  tgId: string;
  totalPoints: number;
  seqNo: string;
  energyLimitLv: number;
  rechargeSpeedLv: number;
  windLv: number;
  fullEnergyKey: string;
  turboKey: number;
  modifyDt: number;
  energyLeft: number;
  userLevel: string;
}

const Container = () => {
  const router = useRouter();
  const [currentBg, setCurrentBg] = useState(defaultCoinBg);
  const { indicatorColor, backgroundColor } = useMemo(() => {
    if (currentBg === defaultCoinBg) {
      return {
        indicatorColor: 'bg-[#fce088]',
        backgroundColor: 'bg-[#c59e65]',
      };
    } else {
      return {
        indicatorColor: 'bg-[#f9cf57]',
        backgroundColor: 'bg-[#aab1d1]',
      };
    }
  }, [currentBg]);
  const [pointUser, setPointUser] = useState<IPointUser | null>(null);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(score);
  const [accumulatedScore, setAccumulatedScore] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);
  const [threshold, setThreshold] = useState(0);
  const goUserLevelPage = () => {
    router.push(ROUTES_USER_LEVEL);
  };
  const goBoostsPage = () => {
    router.push(ROUTES_BOOSTS);
  };

  const updateEnergy = (
    modifyDt: number,
    initialEnergy: number,
    energyLimitLv = 1000,
    rechargeSpeedLv: number = 1,
  ) => {
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - modifyDt) / 1000); // 计算经过的时间段
    const energyIncrement = getEnergyIncrementByLevel(rechargeSpeedLv); // 根据用户等级获取每两秒增加的能量值
    const newEnergy = Math.min(initialEnergy + elapsedSeconds * energyIncrement, energyLimitLv); // 更新能量值，但不超过最大限制
    return newEnergy;
  };

  // 根据用户等级确定每两秒钟能量增加的数量
  const getEnergyIncrementByLevel = (rechargeSpeedLv: number = 1) => {
    switch (rechargeSpeedLv) {
      case 1:
        return 1; // 等级 1 用户每1秒增加 1 点能量
      case 2:
        return 3; // 等级 2 用户每1秒增加 3 点能量
      case 3:
        return 5; // 等级 3 用户每1秒增加 5 点能量
      case 4:
        return 10; // 等级 4 用户每1秒增加 10 点能量
      case 5:
        return 15; // 等级 5 用户每1秒增加 15 点能量
      default:
        return 1; // 默认增加值
    }
  };
  // 当组件卸载时保存数据到localStorage
  useEffect(() => {
    return () => {
      if (pointUser) {
        localStorage.setItem(
          'pointUserData',
          JSON.stringify({ ...pointUser, totalPoints: score, energyLeft: threshold }),
        );
      }
    };
  }, [pointUser, score, threshold]);
  useEffect(() => {
    const savedData = localStorage.getItem('pointUserData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setPointUser(data);
      setScore(data.totalPoints);
      setThreshold(data.energyLeft);
    }
    fetchPointUserData(); // 同步请求后端数据
  }, []);
  useLayoutEffect(() => {
    window.Telegram?.WebApp?.expand();
  }, []);
  // 模拟异步请求后端的数据
  const fetchPointUserData = () => {
    return new Promise<IPointUser>((resolve, reject) => {
      setTimeout(() => {
        const newData = {
          tgId: '12345456789123',
          totalPoints: 0,
          seqNo: '12345789',
          energyLimitLv: 1000,
          rechargeSpeedLv: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
          windLv: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
          fullEnergyKey: 'fullEnergyKey',
          turboKey: 0,
          modifyDt: Date.now() - 2000 * 1000,
          energyLeft: 0,
          userLevel: 'Stubborn Bronze',
        };
        resolve(newData);
      }, 1500);
    })
      .then((data) => {
        console.log('data :>> ', data);
        const newEnergyLeft = updateEnergy(
          data.modifyDt,
          data.energyLeft,
          data.energyLimitLv,
          data.rechargeSpeedLv,
        );
        console.log('newEnergyLeft :>> ', newEnergyLeft);
        setPointUser({
          ...data,
          energyLeft: newEnergyLeft,
        });
        setThreshold(newEnergyLeft);
        if (pointUser && typeof pointUser.totalPoints === 'number') {
          setScore(pointUser.totalPoints);
        } else {
          setScore(0);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        // 处理错误情况，可以设置默认数据或错误提示
      });
  };

  // 最大阈值
  const disableAnimation = useMemo(() => {
    // 获取分数
    if (threshold <= 0) {
      return true;
    } else {
      return false;
    }
  }, [threshold]);
  const throttledSubmitScore = useCallback(
    debounce(() => {
      if (accumulatedScore > 0) {
        console.log('Submitting score to the server:', accumulatedScore);
        setAccumulatedScore(0);
      }
    }, 2000),
    [lastScore],
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      throttledSubmitScore();
    }, 2000);
    return () => clearTimeout(timer);
  }, [lastScore, throttledSubmitScore]);

  const onStatsUpdate = useCallback(
    (change: number) => {
      setThreshold((prevThreshold) => {
        const reduction = Math.min(prevThreshold, change);
        const newThreshold = prevThreshold - reduction;
        const newScore = score + reduction;
        setScore(newScore);
        setLastScore(newScore);
        setAccumulatedScore((prevAcc) => prevAcc + reduction);
        return newThreshold;
      });
    },
    [score],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (lastScore === score) {
        const increment = getEnergyIncrementByLevel(pointUser?.rechargeSpeedLv) * 2;
        setThreshold((prev) =>
          Math.min(prev + increment, pointUser?.energyLimitLv || Number.MAX_SAFE_INTEGER),
        );
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [lastScore, score, pointUser?.rechargeSpeedLv, pointUser?.energyLimitLv]);

  useEffect(() => {
    window.Telegram?.WebApp.setHeaderColor('#000000');
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${currentBg})`,
      }}
    >
      <section className="mt-8 w-full px-4">
        <h1>ccj-test</h1>
        <div className="flex w-full  items-center  justify-between text-20">
          <div className="flex items-center space-x-2">
            <Image src="/images/lightning.png" alt="lightning " width={20} height={26} />
            <span>
              {threshold}/
              <span className="text-16 text-white opacity-80">{pointUser?.energyLimitLv}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2" onClick={goBoostsPage}>
            <Image src="/images/flame.png" alt="flame " width={20} height={26} />
            <span>Boosts</span>
          </div>
        </div>
        <BaseProgress
          value={threshold}
          max={pointUser?.energyLimitLv}
          className="mt-2 w-full"
          backgroundColor={backgroundColor}
          indicatorColor={indicatorColor}
        ></BaseProgress>
      </section>
      <header className="mt-4 flex  items-center space-x-2">
        <Image src="/icons/coin1.svg" alt="operating area" width={36} height={36} />
        <span className="font-700 text-40">{formatNumberWithCommas(score)}</span>
      </header>

      <section className="flex items-center space-x-2" onClick={goUserLevelPage}>
        {pointUser?.userLevel && (
          <>
            <Image
              src={USER_LEVEL[pointUser?.userLevel].icon}
              alt="operating area"
              width={20}
              height={26}
            />
            <span className="text-16">{USER_LEVEL[pointUser?.userLevel].desc}</span>
            <Icon name="right-arrow" className="!text-12px text-gray-700"></Icon>
          </>
        )}
      </section>
      <section className="w-full">
        <ImageSlider
          images={coins}
          onImageChange={(image) => {
            setCurrentBg(image.bgUrl);
          }}
          disableAnimation={disableAnimation}
          onStatsUpdate={onStatsUpdate}
          windLv={pointUser?.windLv}
        ></ImageSlider>
      </section>
      <FullscreenVideoModal
        videoUrl="//vjs.zencdn.net/v/oceans.mp4"
        isNewUser={isNewUser}
      ></FullscreenVideoModal>
    </main>
  );
};

export default Container;
