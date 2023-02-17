import { ContractPromise } from '@polkadot/api-contract';
import type { AnyJson } from '@polkadot/types-codec/types';
import type { WeightV2 } from '@polkadot/types/interfaces/runtime';
import { useEffect, useState } from 'react';
import abi from './metadata';
import usePolkadot from './usePolkadot';
import type BN from 'bn.js';

const CONTRACT_ADDRESS = 'YU7uQgPaeTvdmBDP97FxPn2kYbaWBtUY5LPJETWX9HA1Mzf';

const useCreateBounty = () => {
  const { api, activeAccount } = usePolkadot();
  const [contract, setContract] = useState<ContractPromise>();
  const [data, setData] = useState<AnyJson>();
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);

  const initContract = () => {
    if (api) {
      const contract = new ContractPromise(api, abi, CONTRACT_ADDRESS);
      setContract(contract);
    }
  };

  const createBounty = async (contentIpfsHash: string, amount: number) => {
    if (!contract || !activeAccount || !api) {
      setError("Invalid contract or account or api, can't create bounty");
      return;
    }
    setIsLoading(true);
    const { web3FromSource } = await import('@polkadot/extension-dapp');

    const injector = await web3FromSource(activeAccount.meta.source);
    const { gasRequired, storageDeposit } = await contract.query.createBounty(
      activeAccount.address,
      {
        storageDepositLimit: null,
        gasLimit: -1,
      },
      contentIpfsHash,
      amount
    );
    try {
      const result = await contract.tx
        .createBounty(
          {
            storageDepositLimit: storageDeposit.asCharge,
            gasLimit: api.registry.createType(
              'WeightV2',
              gasRequired
            ) as WeightV2,
          },
          contentIpfsHash,
          amount
        )
        .signAndSend(activeAccount.address, { signer: injector.signer });
      setData(result.toHuman());
    } catch (err) {
      console.error('[create bounty]', err);
      setError(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initContract();
  }, [api]);

  return { data, createBounty, loading: isLoading, error };
};

export default useCreateBounty;
