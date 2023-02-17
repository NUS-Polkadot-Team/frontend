import { ApiPromise, HttpProvider } from '@polkadot/api';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { createContext, useEffect, useState, type ReactNode } from 'react';

const providerSockets = {
  shibuyaTestnet: 'https://evm.shibuya.astar.network',
};

interface PolkadotState {
  blockchainUrl: string;
  isApiLoading: boolean;
  isExtensionLoading: boolean;
  api?: ApiPromise;
  accounts: InjectedAccountWithMeta[];
  activeAccount?: InjectedAccountWithMeta;
  setup: () => Promise<void>;
  setActiveAccount: (account?: InjectedAccountWithMeta) => void;
}

const initialState: PolkadotState = {
  blockchainUrl: providerSockets.shibuyaTestnet,
  isApiLoading: true,
  isExtensionLoading: false,
  accounts: [],
  setup: async () => {},
  setActiveAccount: (account?: InjectedAccountWithMeta) => {},
};

export const PolkadotContext = createContext<PolkadotState>(initialState);

interface PolkadotProviderProps {
  children?: ReactNode;
}

export const PolkadotProvider = ({ children }: PolkadotProviderProps) => {
  const [state, setState] = useState(initialState);

  const setActiveAccount = (account?: InjectedAccountWithMeta) => {
    setState((prev) => ({ ...prev, activeAccount: account }));
  };

  const extensionSetup = async () => {
    setState((prev) => ({ ...prev, isExtensionLoading: true }));
    const { web3Accounts, web3Enable } = await import(
      '@polkadot/extension-dapp'
    );
    const extensions = await web3Enable('BountiFi');
    if (extensions.length === 0) {
      return;
    }
    const accounts = await web3Accounts();
    setState((prev) => ({ ...prev, accounts, isExtensionLoading: false }));
  };

  const setup = async () => {
    setState((prev) => ({ ...prev, isApiLoading: true }));
    const httpProvider = new HttpProvider(state.blockchainUrl);
    const api = await ApiPromise.create({ provider: httpProvider });
    setState((prev) => ({ ...prev, api }));
    await extensionSetup();
    setState((prev) => ({ ...prev, isApiLoading: false }));
  };

  const resetSigner = async () => {
    if (state.api && state.activeAccount) {
      const { web3FromSource } = await import('@polkadot/extension-dapp');
      const injector = await web3FromSource(state.activeAccount.meta.source);
      state.api.setSigner(injector.signer);
    }
  };

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    resetSigner();
  }, [state.activeAccount]);

  return (
    <PolkadotContext.Provider
      value={{
        ...state,
        setActiveAccount,
        setup,
      }}
    >
      {children}
    </PolkadotContext.Provider>
  );
};
