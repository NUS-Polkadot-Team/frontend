import type { ApiPromise } from '@polkadot/api';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import type { AnyJson } from '@polkadot/types/types';
import { createContext, ReactNode } from 'react';

interface InitialState {
  blockchainUrl: string;
  api?: ApiPromise;
  accounts: InjectedAccountWithMeta[];
  block: number;
  lastBlockHash: string;
  contractAddress: string;
  actingAddress: string;
  result: string;
  gasConsumed: Record<string, AnyJson>;
  outcome: string;
}

const initialState: InitialState = {
  blockchainUrl: 'ws://127.0.0.1:9944',
  api: undefined,
  accounts: [],
  block: 0,
  lastBlockHash: '',
  contractAddress: '',
  actingAddress: '',
  result: '',
  gasConsumed: {},
  outcome: '',
};

interface PolkadotContextProviderProps {
  children?: ReactNode;
}

const PolkadotContext = createContext<InitialState>(initialState);
const PolkadotContextProvider = (props: PolkadotContextProviderProps) => {
  // const [state, dispatch] = useReducer(reducer, initState);

  // const startConnection = () => {
  //   connect(state, dispatch);
  //   loadAccounts(state, dispatch);
  // };

  return (
    <PolkadotContext.Provider value={{}}>
      {props.children}
    </PolkadotContext.Provider>
  );
};
