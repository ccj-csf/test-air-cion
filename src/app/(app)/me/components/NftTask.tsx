import { BaseButton, Icon } from '@/components';
import { formatNumberWithCommas } from '@/utils';
import Image from 'next/image';
import { useMemo } from 'react';
import { IUser } from './Container';
interface NftTaskProps {
  user: IUser | null;
  loading: boolean;
}
const NftTask: React.FC<NftTaskProps> = ({ user, loading }) => {
  const title = useMemo(() => {
    switch (user?.nftType) {
      case 'Free Mint Air ID':
        return 'Free Mint Air ID';
      case 'Join Air Force Club':
        return 'Join Air Force Club';
      case 'Join Air Force Founding Club':
        return 'Join Air Force Founding Club';
      default:
        return 'Claim AivID to Get Airdrop';
    }
  }, [user?.nftType]);
  return (
    <section>
      <h2 className="mb-2">{title}</h2>
      <section className="space-y-8 rounded-14 bg-gray-400 px-3 py-4">
        {true ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon name="twitter" className="!text-30"></Icon>
                <div className="ml-3 text-12">
                  <div className="flex items-center space-x-1">
                    <span>X(Twitter)</span>
                    <Image src="/icons/coin1.svg" width={15} height={15} alt="coin1" />
                    <span>+{formatNumberWithCommas(15780)}</span>
                  </div>
                  <span className="text-gray-200">Verify twitter</span>
                </div>
              </div>
              <BaseButton
                variant="custom"
                customClasses="h-[30px] w-[70px] rounded-[20px] bg-transparent border border-white"
              >
                Go
              </BaseButton>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon name="telegram" className="!text-30"></Icon>
                <div className="ml-3 text-12">
                  <div className="flex items-center space-x-1">
                    <span>Join TG Gnap</span>
                    <Image src="/icons/coin1.svg" width={15} height={15} alt="coin1" />
                    <span>+{formatNumberWithCommas(15780)}</span>
                  </div>
                  <span className="text-gray-200">Join the TG Gnap</span>
                </div>
              </div>
              <BaseButton
                variant="custom"
                customClasses="h-[30px] w-[70px] rounded-[20px] bg-transparent border border-white"
              >
                Go
              </BaseButton>
            </div>
            <BaseButton
              className="w-full"
              disabled={!user?.isFollowingTwitter && !user?.isJoinTelegram}
            >
              Claim AirID
            </BaseButton>
          </>
        ) : (
          <section className="space-y-6">
            <div className="flex items-center space-x-4 text-16 font-medium">
              <Image src="/icons/star.svg" width={19} height={19} alt="star" />
              <span>Move commisin</span>
            </div>
            <div className="flex items-center space-x-4 text-16 font-medium">
              <Image src="/icons/star.svg" width={19} height={19} alt="star" />
              <span>Priority airdrop</span>
            </div>
            <div className="flex items-center space-x-4 text-16 font-medium">
              <Image src="/icons/star.svg" width={19} height={19} alt="star" />
              <span>Join Member Club</span>
            </div>
            <BaseButton className="w-full">Update Air Boost</BaseButton>
          </section>
        )}
      </section>
    </section>
  );
};

export default NftTask;
