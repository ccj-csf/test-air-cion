import { BaseButton, BaseSlideUpModal, Icon } from '@/components';
import { SlideUpModalRef } from '@/components/base-slide-up-modal';
import { ROUTES_GROUP_LIST, ROUTES_MAIN } from '@/constants';
import { useMessage, useTelegram } from '@/hooks';
import { formatNumberWithCommas } from '@/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

type IOnboardingType = 'onboarding1' | 'onboarding2' | 'onboarding3';
interface IOnboardingContent {
  icon: string;
  desc: string;
  rewards: number;
  isAchieved: boolean;
  type: IOnboardingType;
}
// 模拟 API 调用
const apiSimulation = async (message: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`Success: ${message}`);
      } else {
        reject(`Error: ${message}`);
      }
    }, 1000);
  });
};

// 定义策略接口
type CheckStrategy = () => Promise<string>;

// 实现策略
const strategyMap: Record<IOnboardingType, CheckStrategy> = {
  onboarding1: () => apiSimulation('Playing the game'),
  onboarding2: () => apiSimulation('Inviting friends'),
  onboarding3: () => apiSimulation('Joining the squad'),
};
const Onboarding = () => {
  const { handleInviteFriend } = useTelegram();
  const { showMessage } = useMessage();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [onboardingType, setOnboardingType] = useState<IOnboardingType>('onboarding1');
  const modalRef = useRef<SlideUpModalRef>(null);
  const [onboardingContents, setOnboardingContents] = useState<IOnboardingContent[]>([
    {
      icon: '/icons/onboarding-1.svg',
      desc: 'Earn 1000 Aircoin',
      rewards: 3000,
      isAchieved: false,
      type: 'onboarding1',
    },
    {
      icon: '/icons/onboarding-2.svg',
      desc: 'Invite 10 friends',
      rewards: 100000,
      isAchieved: false,
      type: 'onboarding2',
    },
    {
      icon: '/icons/onboarding-3.svg',
      desc: 'Join Squad',
      rewards: 5000,
      isAchieved: true,
      type: 'onboarding3',
    },
  ]);
  const modalContents = useMemo(() => {
    switch (onboardingType) {
      case 'onboarding1':
        return {
          title: onboardingContents[0].desc,
          btnDesc: 'Go to play',
          rewards: onboardingContents[0].rewards,
        };
      case 'onboarding2':
        return {
          title: onboardingContents[1].desc,
          btnDesc: 'Invite friends',
          rewards: onboardingContents[1].rewards,
        };
      case 'onboarding3':
        return {
          title: onboardingContents[2].desc,
          btnDesc: 'Join',
          rewards: onboardingContents[2].rewards,
        };
      default:
    }
  }, [onboardingContents, onboardingType]);
  const handleOnboarding = (content: IOnboardingContent) => () => {
    if (content.isAchieved) {
      return;
    }
    setOnboardingType(content.type);
    modalRef.current?.open();
  };
  const handleCheck = async () => {
    setLoading(true);
    try {
      const result = await strategyMap[onboardingType]();
      modalRef.current?.close();
      showMessage.success(result);
    } catch (error: any) {
      showMessage.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const handleSecondaryAction = () => {
    switch (onboardingType) {
      case 'onboarding1':
        router.push(ROUTES_MAIN);
        break;
      case 'onboarding2':
        handleInviteFriend();
        break;
      case 'onboarding3':
        router.push(ROUTES_GROUP_LIST);
        break;
      default:
    }
  };

  return (
    <main className="mt-7">
      <h2 className="font-600 text-20">Onboarding</h2>
      <div className="mt-2 space-y-10 rounded-14 bg-gray-400 p-[30px]">
        {onboardingContents?.map((content, index) => {
          return (
            <section className="flex space-x-6" key={index} onClick={handleOnboarding(content)}>
              <Image src={content.icon} alt="onboarding-1" width={32} height={32} />
              <div className="flex flex-1 justify-between ">
                <div className="flex flex-col space-y-1">
                  <span className="font-500 text-14 text-gray-100">{content.desc}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-600 text-12">
                      +{formatNumberWithCommas(content.rewards)}
                    </span>
                    <Image src="/icons/coin1.svg" alt="coin1" width={16} height={16} />
                  </div>
                </div>
                {content.isAchieved ? (
                  <Check className="self-center" />
                ) : (
                  <Icon name="right-arrow" className="self-center  text-gray-200"></Icon>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <BaseSlideUpModal ref={modalRef}>
        <main className="mt-4 flex flex-col items-center px-8">
          <Image
            src="/icons/celebrate.svg"
            alt="celebrate icon"
            width={100}
            height={100}
            className="mt-4"
          />
          <h3 className="font-700 my-4 text-center text-24">{modalContents?.title}</h3>
          <BaseButton variant="custom" customClasses="h-10" onClick={handleSecondaryAction}>
            {modalContents?.btnDesc}
          </BaseButton>
          <p className="my-4 flex items-center space-x-2">
            <Image src="/icons/coin1.svg" alt="coin1" width={16} height={16} />{' '}
            <span>+{formatNumberWithCommas(modalContents?.rewards)}</span>
          </p>
          <BaseButton
            className="mt-4 h-[60px] w-full !text-20"
            onClick={handleCheck}
            loading={loading}
          >
            Check
          </BaseButton>
        </main>
      </BaseSlideUpModal>
    </main>
  );
};

export default Onboarding;
