import { useCallback } from 'react';

export const useTelegram = () => {
  const handleInviteFriend = useCallback((inviteCode?: string | undefined) => {
    inviteCode = inviteCode || '123456';
    console.log('handleInvite');
    const url = encodeURIComponent(
      `${process.env.NEXT_PUBLIC_TG_MINIAPP_URL}?startapp=${inviteCode}`,
    );
    window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${url}`);
  }, []);

  const handleJoinGroup = useCallback(() => {
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/${process.env.NEXT_PUBLIC_TG_MINIAPP_NAME}?startgroup=soulu`,
    );
  }, []);

  return {
    handleInviteFriend,
    handleJoinGroup,
  };
};
