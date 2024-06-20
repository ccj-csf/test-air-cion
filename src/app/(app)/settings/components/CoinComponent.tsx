import { BaseButton } from '@/components';
import { useMessage } from '@/hooks';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

/**
 * 创建一个音频分析器，用于从媒体流中提取音频数据并返回音量值。
 * @param audioContext 音频上下文对象，用于音频处理。
 * @param stream 媒体流，包含音频数据。
 * @returns 返回一个函数，调用该函数可获取当前的音量值。
 */
const createAudioMeter = (audioContext: AudioContext, stream: MediaStream) => {
  const analyser = audioContext.createAnalyser();
  const source = audioContext.createMediaStreamSource(stream);
  source.connect(analyser);
  analyser.fftSize = 512;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const getVolume = () => {
    analyser.getByteFrequencyData(dataArray);
    let sum = 0;
    for (const value of dataArray) {
      sum += value;
    }
    return sum / bufferLength;
  };

  return getVolume;
};
interface ErrorHandlingConfig {
  onPermissionDenied?: () => void; // 当权限被拒综时执行的回调函数
  onError?: (error: Error) => void; // 当其他错误发生时执行的回调函数
  permissionDeniedMessage?: string; // 权限被拒绝时的用户提示信息
  genericErrorMessage?: string; // 通用错误消息
}
interface IProps {
  incrementValue?: number;
  onStatsUpdate?: (coins: number) => void;
  disableAnimation?: boolean;
  coinImagePath?: string;
  coinWidth?: number; // 金币图片宽度
  coinHeight?: number; // 金币图片高度
  baseThreshold?: number; // 基础阈值
  volumeLevels?: { threshold: number; coinTextCount: number }[]; // 音量级别阈值
  animationDuration?: number; // 动画持续时间
  updateInterval?: number; // 音量检测的更新间隔，影响响应速度和性能
  textFadeDuration?: number; // 文本淡出动画的持续时间，用于控制文本消失的速度
  showTextTimeout?: number; // 显示文本的持续时间，之后文本将消失，单位为毫秒
  errorHandlingConfig?: ErrorHandlingConfig; // 错误处理配置
}

const CoinComponent: React.FC<IProps> = ({
  incrementValue = 1,
  onStatsUpdate,
  disableAnimation = false,
  coinImagePath = '/icons/coin1.svg',
  coinWidth = 288, // 设置默认宽度
  coinHeight = 288, // 设置默认高度
  baseThreshold = 15, // 默认基础阈值
  volumeLevels = [
    { threshold: 15, coinTextCount: 1 },
    { threshold: 20, coinTextCount: 2 },
    { threshold: 35, coinTextCount: 3 },
  ], // 默认值, // 默认音量级别阈值
  animationDuration = 0.68, // 默认动画时间
  updateInterval = 1000, // 默认更新间隔
  textFadeDuration = 1, // 文字淡出时间
  showTextTimeout = 1000,
  errorHandlingConfig = {
    onPermissionDenied: () => console.log('Microphone access denied'),
    onError: (error) => console.error('An error occurred:', error),
    permissionDeniedMessage: 'Microphone access is required to play this game.',
    genericErrorMessage: 'An error has occurred. Please try again.',
  },
}) => {
  const { showMessage } = useMessage();
  const [volume, setVolume] = useState(0);
  const [coins, setCoins] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const [showCoinText, setShowCoinText] = useState<number>(0);
  const lastAnimationTime = useRef(0);
  const lastSoundTime = useRef(Date.now());

  const controls = useAnimation();
  const windControls = useAnimation();

  const initAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(audioCtx);
      const getVolume = createAudioMeter(audioCtx, stream);

      const updateVolume = () => {
        const newVolume = getVolume();
        const normalizedVolume = Math.min(100, Math.max(0, (newVolume / 128) * 100));
        setVolume(normalizedVolume);

        const currentTime = Date.now();
        if (normalizedVolume > baseThreshold) {
          lastSoundTime.current = currentTime;
        }

        if (
          currentTime - lastAnimationTime.current > updateInterval &&
          normalizedVolume > baseThreshold
        ) {
          let coinTextCount = 0;
          // 通过遍历数组找到最高满足的音量阶段
          for (let level of volumeLevels) {
            if (normalizedVolume > level.threshold) {
              coinTextCount = level.coinTextCount;
            } else {
              break; // 因为数组是有序的，一旦未满足，后面的也不会满足
            }
          }

          if (coinTextCount > 0) {
            setCoins((prevCoins) => prevCoins + coinTextCount * incrementValue * 2);
            setShowCoinText(coinTextCount);
            setTimeout(() => setShowCoinText(0), showTextTimeout);
            lastAnimationTime.current = currentTime;

            // 触发摇晃动画
            controls.start({
              y: [-7, 7, -7, 7, -4, 4, -2, 2, 0], // 逐渐减小的上下移动
              rotate: [-1, 1, -1, 1, -0.5, 0.5, -0.25, 0], // 轻微并逐步减小的旋转
              scale: [1, 1.015, 1, 1.015, 1.01, 1, 1.01, 1], // 更细微的缩放变化
              transition: {
                duration: animationDuration, // 增加动画持续时间
                ease: 'easeInOut', // 使用非线性缓动函数
                times: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 0.95, 1], // 非对称的时间点分配，让动画更自然
              },
            });

            // 触发wind图标动画
            windControls.start({
              y: [0, -30],
              scale: [1, 1.5, 1],
              opacity: [1, 0],
              transition: { duration: 0.8, ease: 'easeOut' },
            });
          }
        }

        requestAnimationFrame(updateVolume);
      };

      updateVolume();
      setMicPermissionDenied(false);
    } catch (error: any) {
      if (error.name === 'PermissionDeniedError' || error.name === 'NotAllowedError') {
        setMicPermissionDenied(true);
        if (errorHandlingConfig.onPermissionDenied) {
          errorHandlingConfig.onPermissionDenied();
        }
        errorHandlingConfig.permissionDeniedMessage &&
          showMessage.error(errorHandlingConfig.permissionDeniedMessage);
        console.warn(errorHandlingConfig.permissionDeniedMessage);
      } else {
        if (errorHandlingConfig.onError) {
          errorHandlingConfig.onError(error);
        }
        errorHandlingConfig.genericErrorMessage &&
          showMessage.error(errorHandlingConfig.genericErrorMessage);
        console.error(errorHandlingConfig.genericErrorMessage);
      }
    }
  };

  useEffect(() => {
    initAudio();
    return () => {
      audioContext?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastSoundTime.current > 10) {
        if (onStatsUpdate) {
          onStatsUpdate(coins);
        }
        setCoins(0);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [coins, onStatsUpdate]);

  const swingAmount = volume > baseThreshold ? Math.min((volume - baseThreshold) / 2, 50) : 0;
  const windIntensity = volume > baseThreshold ? Math.min(volume, 100) / 5 : 0;

  const renderCoinText = (): ReactNode[] => {
    const positions = [
      { top: '25%', left: '30px', transform: 'translateY(-50%)' },
      { top: '50%', left: '30px', transform: 'translateY(-50%)' },
      { top: '70%', left: '30px', transform: 'translateY(-50%)' },
      { top: '25%', right: '30px', transform: 'translateY(-50%)' },
      { top: '50%', right: '30px', transform: 'translateY(-50%)' },
      { top: '70%', right: '30px', transform: 'translateY(-50%)' },
    ];

    const texts: ReactNode[] = [];
    for (let i = 0; i < showCoinText; i++) {
      positions.forEach((pos, index) => {
        if (i * 2 + index < showCoinText * 2) {
          texts.push(
            <motion.div
              key={`coin-text-${i}-${index}`}
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -150, opacity: 0, scale: 0.5 }}
              transition={{ duration: textFadeDuration, ease: 'easeOut' }}
              className="absolute text-40 font-bold text-white"
              style={pos}
            >
              +{incrementValue}
            </motion.div>,
          );
        }
      });
    }
    return texts;
  };

  const renderAirFlow = (): ReactNode => {
    const airFlowElements = [];
    const totalElements = Math.min(20, Math.floor(volume / 10) + 1); // 根据音量计算风的数量

    for (let i = 0; i < totalElements; i++) {
      const leftPosition = Math.random() * 100; // 水平位置随机化，0%到100%之间
      const initialYOffset = Math.random() * 60; // 初始Y偏移，在0px到60px之间
      const opacity = Math.min(1, Math.max(0.5, volume / 128)); // 透明度，最低为0.5，根据音量增加
      const duration = 1 - 0.5 * (volume / 128); // 计算动画持续时间

      airFlowElements.push(
        <motion.div
          key={`air-flow-${i}`}
          initial={{ opacity, y: initialYOffset, left: `${leftPosition}%` }}
          animate={{ opacity: 0, y: -300 }}
          transition={{ duration, ease: 'easeOut' }}
          className="wind-element"
          style={{ transformOrigin: 'center bottom' }}
        />,
      );
    }
    return <>{airFlowElements}</>;
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {micPermissionDenied ? (
        <>
          <p className="text-red-500">麦克风权限被拒绝，请允许麦克风访问。</p>
          <BaseButton onClick={() => initAudio()} variant="custom" className="mt-4 w-full">
            重新授权
          </BaseButton>
        </>
      ) : (
        <>
          <motion.div
            animate={!disableAnimation ? controls : {}}
            className="relative rounded-full "
          >
            <Image
              src={coinImagePath}
              alt="Coin"
              width={coinHeight} // 使用宽度参数
              height={coinWidth} // 使用高度参数
            />
            {!disableAnimation && renderCoinText()}
            {!disableAnimation && showCoinText > 0 && renderAirFlow()}
          </motion.div>
          <motion.div
            animate={!disableAnimation ? windControls : {}}
            initial={{ opacity: 0 }} // 初始状态设置为不显示
            className="transform-origin-center absolute bottom-[-60px] left-auto -translate-x-1/2 transform"
          >
            <Image src="/icons/wind.svg" alt="wind" width={26} height={23} />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default CoinComponent;
