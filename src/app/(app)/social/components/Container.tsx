'use client';
import { BaseButton } from '@/components';
import { useTelegram } from '@/hooks';
import { useState } from 'react';
import PrimaryTab from './PrimaryTab';
import SecondaryFriendsTab from './SecondaryFriendsTab';
import SecondarySquadTab from './SecondarySquadTab';

const Container = () => {
  const { handleInviteFriend } = useTelegram();
  const [currentKey, setCurrentKey] = useState('Friends');
  const handleTabChange = (key: string) => {
    console.log('key :>> ', key);
    setCurrentKey(key);
  };

  return (
    <main className="px-4">
      <PrimaryTab currentKey={currentKey} onChange={handleTabChange}></PrimaryTab>
      {currentKey === 'Friends' ? (
        <SecondaryFriendsTab></SecondaryFriendsTab>
      ) : (
        <SecondarySquadTab></SecondarySquadTab>
      )}
      <section className="fixed bottom-28 left-0 right-0 z-10 px-4">
        <BaseButton className=" h-[46px] w-full" onClick={() => handleInviteFriend()}>
          Invite a friend
        </BaseButton>
      </section>
    </main>
  );
};
export default Container;
