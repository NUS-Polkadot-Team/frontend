import usePolkadot from '@/hooks/usePolkadot';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import React, { useEffect } from 'react';
import { Button } from './Button';

const WalletButton: React.FC = () => {
  const { api, accounts, setActiveAccount, activeAccount, setSigner } =
    usePolkadot();
  const [selectedAccount, setSelectedAccount] =
    React.useState<InjectedAccountWithMeta>();

  const handleSelect = async (index: string) => {
    setSelectedAccount(accounts[+index]);
  };

  const handleLogin = async () => {
    if (!api || !selectedAccount) {
      console.error('API or account not selected');
      return;
    }
    await setSigner(selectedAccount);
  };

  const handleLogout = () => {
    api?.disconnect();
    setActiveAccount(undefined);
  };

  useEffect(() => {
    if (api && accounts.length && !selectedAccount) {
      setSelectedAccount(accounts[0]);
    }
  }, [api, accounts]);

  // No API installed
  if (!api) {
    return <div>Please install a wallet</div>;
  }

  // No accounts found
  if (!accounts.length) {
    return <div>No accounts found on Shibuya Testnet</div>;
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
