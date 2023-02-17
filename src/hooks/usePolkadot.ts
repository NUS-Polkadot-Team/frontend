import abi from '@/hooks/metadata';
import { ApiPromise, HttpProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useEffect, useState } from 'react';

const providerSockets = {
  shibuyaTestnet: 'https://evm.shibuya.astar.network',
};

const usePolkadot = () => {
  const [blockchainUrl, setBlockchainUrl] = useState(
    providerSockets.shibuyaTestnet
  );
  const [api, setApi] = useState<ApiPromise>();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [activeAccount, setActiveAccount] = useState<InjectedAccountWithMeta>();
  const [isApiLoading, setIsApiLoading] = useState(true);
  const [isExtensionLoading, setIsExtensionLoading] = useState(false);
  // const [contractAddress, setContractAddress] = useState('');
  // const [result, setResult] = useState('');
  // const [gasConsumed, setGasConsumed] = useState<any>();
  // const [outcome, setOutcome] = useState('');

  const extensionSetup = async () => {
    setIsExtensionLoading(true);
    const { web3Accounts, web3Enable } = await import(
      '@polkadot/extension-dapp'
    );
    const extensions = await web3Enable('BountiFi');
    if (extensions.length === 0) {
      return;
    }
    const accounts = await web3Accounts();
    setAccounts(accounts);
    setIsExtensionLoading(false);
  };

  const setup = async () => {
    setIsApiLoading(true);
    const httpProvider = new HttpProvider(blockchainUrl);
    const api = await ApiPromise.create({ provider: httpProvider });
    setApi(api);
    await extensionSetup();
    setIsApiLoading(false);
  };

  const setSigner = async (account: InjectedAccountWithMeta) => {
    if (api) {
      const { web3FromSource } = await import('@polkadot/extension-dapp');
      const injector = await web3FromSource(account.meta.source);
      api.setSigner(injector.signer);
      setActiveAccount(account);
    }
  };

  // const getFlipValue = async () => {
  //   if (api !== undefined) {
  //     const contract = new ContractPromise(api, abi, contractAddress);
  //     const { gasConsumed, result, output } = await contract.query.get(
  //       activeAddress,
  //       { value: 0, gasLimit: -1 }
  //     );
  //     setGasConsumed(gasConsumed.toHuman());
  //     setResult(JSON.stringify(result.toHuman()));
  //     if (output !== undefined && output !== null) {
  //       setOutcome(output.toHuman()?.toString() ?? '');
  //     }
  //   }
  // };

  // const changeFlipValue = async () => {
  //   if (api) {
  //     const { web3FromSource } = await import('@polkadot/extension-dapp');
  //     const contract = new ContractPromise(api, abi, contractAddress);
  //     const performingAccount = accounts[0];
  //     const injector = await web3FromSource(performingAccount.meta.source);
  //     const flip = await contract.tx.flip({ value: 0, gasLimit: -1 });
  //     if (injector !== undefined) {
  //       flip.signAndSend(
  //         performingAccount.address,
  //         { signer: injector.signer },
  //         (result) => {
  //           if (result.status.isInBlock) {
  //             setResult('in a block');
  //           } else if (result.status.isFinalized) {
  //             setResult('finalized');
  //           }
  //         }
  //       );
  //     }
  //   }
  // };

  useEffect(() => {
    setup();
  }, []);

  return {
    blockchainUrl,
    isApiLoading,
    isExtensionLoading,
    api,
    accounts,
    activeAccount,
    setup,
    setActiveAccount,
    setSigner,
  };
};

export default usePolkadot;
