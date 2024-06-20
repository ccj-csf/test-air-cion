import { BaseButton, Icon } from '@/components';
import { ROUTES_SETTINGS } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IUser } from './Container';
interface Props {
  user: IUser | null;
  loading: boolean;
}
const Header: React.FC<Props> = ({ user, loading }) => {
  const router = useRouter();
  const goSettingsPage = () => {
    router.push(ROUTES_SETTINGS);
  };
  return (
    <header className="relative mt-4 flex space-x-4">
      <section className="relative inline-block">
        <Image
          src="https://github.com/david.png"
          width={66}
          height={66}
          alt="avatar"
          className="rounded-full"
        />
        {user?.isMember && (
          <Image
            src="/icons/member.svg"
            width={32}
            height={32}
            alt="member icon"
            className="absolute -top-4 right-4"
          />
        )}
      </section>
      <section className="flex flex-col">
        <span className="font-600 text-24">{user?.telegramUsername}</span>
        <div className="mt-1 flex items-center space-x-1 text-14">
          <span className="text-blue">x</span>
          <span className="text-blue">@{user?.twitterName}</span>
          {user?.twitterVerified && (
            <BaseButton className="!ml-2 h-6 rounded-14 !text-12">Verify</BaseButton>
          )}
        </div>
      </section>
      <Icon name="fold" className="absolute right-0" onClick={goSettingsPage}></Icon>
    </header>
  );
};

export default Header;
