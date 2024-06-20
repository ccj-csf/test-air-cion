import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useTelegramBackButton = () => {
  const router = useRouter();

  useEffect(() => {
    // 显示后退按钮
    window.Telegram?.WebApp?.BackButton?.show();

    // 定义处理后退按钮点击事件的函数
    const handleBackButton = () => {
      console.log('Back button clicked');
      router.back();
    };

    // 为后退按钮点击事件添加监听器
    window.Telegram?.WebApp?.onEvent('backButtonClicked', handleBackButton);

    // 清理函数：移除监听器
    return () => {
      window.Telegram?.WebApp?.offEvent('backButtonClicked', handleBackButton);
    };
  }, [router]); // 依赖于 router 确保在路由变化时重新绑定事件
};

export default useTelegramBackButton;
