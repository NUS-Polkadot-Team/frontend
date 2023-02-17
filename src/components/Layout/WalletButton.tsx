import usePolkadot from '@/hooks/usePolkadot';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useEffect, useState } from 'react';
import { Button } from './Button';

const WalletButton = () => {
  const {
    isApiLoading,
    isExtensionLoading,
    api,
    accounts,
    setup,
    setActiveAccount,
    activeAccount,
  } = usePolkadot();
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta>();

  const handleSelect = async (index: string) => {
    setSelectedAccount(accounts[+index]);
  };

  const handleLogin = async () => {
    if (!api || !selectedAccount) {
      console.error('API or account not selected');
      return;
    }
    setActiveAccount(selectedAccount);
  };

  const handleLogout = async () => {
    await api?.disconnect();
    setActiveAccount(undefined);
  };

  // set first account as selected account on page load
  useEffect(() => {
    if (api && accounts.length && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [api, accounts]);

  // Waiting for user to allow extension
  if (isExtensionLoading) {
    return (
      <div className="flex">
        <span className="text-sm">
          Please allow BountiFi access to your wallet
        </span>
        <Button
          variant="solid"
          href="/"
          className="h-12 w-full"
          onClick={setup}
        >
          Allow
        </Button>
      </div>
    );
  }

  if (isApiLoading) {
    return <div className="text-sm">Loading...</div>;
  }

  // No API installed
  if (!api) {
    return <div className="text-sm">Please install a wallet</div>;
  }

  // No accounts found
  if (!accounts.length) {
    return <div className="text-sm">No accounts found on Shibuya Testnet</div>;
  }

  // Not logged in
  if (!activeAccount) {
    return (
      <div className="flex space-x-2">
        <select
          className="block w-full rounded-lg border-2 border-slate-900 bg-slate-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => handleSelect(e.target.value)}
          defaultValue={'0'}
        >
          {accounts.map((account, index) => (
            <option key={account.address} value={index}>
              {account.meta.name}
            </option>
          ))}
        </select>
        <Button className="rounded-lg" onClick={handleLogin}>
          Connect
        </Button>
      </div>
    );
  }

  // Logged in
  return (
    <div className="flex space-x-2">
      <select
        className="block w-full rounded-lg border-2 border-slate-900 bg-slate-50 p-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        onChange={(e) => handleSelect(e.target.value)}
      >
        {accounts.map((account, index) => (
          <option key={account.address} value={index}>
            {account.meta.name}
          </option>
        ))}
      </select>
      <Button className="rounded-lg" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default WalletButton;
