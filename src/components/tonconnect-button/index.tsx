'use client';
import { TonConnectButton } from '@tonconnect/ui-react';
import { FC, memo } from 'react';

interface TonconnectButtonProps {
  [key: string]: unknown;
}
const TonconnectButton: FC<TonconnectButtonProps> = memo((props) => {
  return <TonConnectButton {...props} />;
});
TonconnectButton.displayName = 'TonconnectButton';
export default TonconnectButton;
