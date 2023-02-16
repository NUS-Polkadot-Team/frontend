import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PrimaryFeatures } from '@/components/PrimaryFeatures';
import abi from '@/context/metadata';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [blockchainUrl, setBlockchainUrl] = useState('ws://127.0.0.1:9944');
  const [api, setApi] = useState<any>();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [block, setBlock] = useState(0);
  const [lastBlockHash, setLastBlockHash] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [actingAddress, setActingAddress] = useState('');
  const [result, setResult] = useState('');
  const [gasConsumed, setGasConsumed] = useState<any>();
  const [outcome, setOutcome] = useState('');

  const extensionSetup = async () => {
    const { web3Accounts, web3Enable } = await import(
      '@polkadot/extension-dapp'
    );
    const extensions = await web3Enable('Polk4NET');
    if (extensions.length === 0) {
      return;
    }
    const account = await web3Accounts();
    setAccounts(account);
  };

  const setup = async () => {
    const wsProvider = new WsProvider(blockchainUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.rpc.chain.subscribeNewHeads((lastHeader) => {
      setBlock(lastHeader.number.toNumber());
      setLastBlockHash(lastHeader.hash.toString());
    });
    setApi(api);
    await extensionSetup();
  };

  const getFlipValue = async () => {
    const contract = new ContractPromise(api, abi, contractAddress);
    const { gasConsumed, result, output } = await contract.query.get(
      actingAddress,
      { value: 0, gasLimit: -1 }
    );
    setGasConsumed(gasConsumed.toHuman());
    setResult(JSON.stringify(result.toHuman()));
    if (output !== undefined && output !== null) {
      setOutcome(output.toHuman()?.toString() ?? '');
    }
  };

  const changeFlipValue = async () => {
    const { web3FromSource } = await import('@polkadot/extension-dapp');
    const contract = new ContractPromise(api, abi, contractAddress);
    const performingAccount = accounts[0];
    const injector = await web3FromSource(performingAccount.meta.source);
    const flip = await contract.tx.flip({ value: 0, gasLimit: -1 });
    if (injector !== undefined) {
      flip.signAndSend(
        performingAccount.address,
        { signer: injector.signer },
        (result) => {
          if (result.status.isInBlock) {
            setResult('in a block');
          } else if (result.status.isFinalized) {
            setResult('finalized');
          }
        }
      );
    }
  };

  useEffect(() => {
    setup();
  });

  return (
    <>
      <Head>
        <title>TaxPal - Accounting made simple for small businesses</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main className="w-full max-w-none px-0">
        <Hero />
        <PrimaryFeatures />
      </main>
      <Footer />
    </>
  );
}
