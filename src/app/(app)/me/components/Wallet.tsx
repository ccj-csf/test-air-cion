import { BaseButton, Icon } from '@/components';
import { WalletUtils } from '@/utils';
import { IUser } from './Container';
interface Props {
  user: IUser | null;
  loading: boolean;
}
const Wallet: React.FC<Props> = ({ user, loading }) => {
  return (
    <section>
      {!user?.isLinkedWallet ? (
        <BaseButton className="w-full">Connect wallet</BaseButton>
      ) : (
        <div className="flex items-center space-x-2 rounded-14 bg-gray-400 p-[14px] text-16">
          <Icon name="wallet" className="!text-20"></Icon>
          <span>{WalletUtils.formatAddress(user.walletAddress)}</span>
          <span className=" inline-block h-1 w-1 rounded-full bg-white"></span>
          <span className="text-yellow">Wallet</span>
        </div>
      )}
    </section>
  );
};

export default Wallet;
