import { ContractPromise } from '@polkadot/api-contract';
import type { AnyJson } from '@polkadot/types-codec/types';
import { useCallback, useEffect, useState } from 'react';
import abi from './metadata';
import usePolkadot from './usePolkadot';
import type { WeightV2 } from '@polkadot/types/interfaces/runtime';
import result from 'postcss/lib/result';

const useCreateBounty = () => {
  const { api, activeAccount } = usePolkadot();
  const [contract, setContract] = useState<ContractPromise>();
  const [data, setData] = useState<AnyJson>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const initContract = () => {
    if (api) {
      const contract = new ContractPromise(
        api,
        abi,
        'YU7uQgPaeTvdmBDP97FxPn2kYbaWBtUY5LPJETWX9HA1Mzf'
      );
      setContract(contract);
    }
  };

  const createBounty = async (contentIpfsHash: string, amount: number) => {
    if (!contract || !activeAccount || !api) {
      return;
    }
    setLoading(true);
    const { web3FromSource } = await import('@polkadot/extension-dapp');

    const injector = await web3FromSource(activeAccount.meta.source);
    const { gasRequired, storageDeposit, result } =
      await contract.query.createBounty(
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
      console.error('create bounty', err);
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    initContract();
  }, [api]);

  return { data, createBounty, loading, error };
};

export default useCreateBounty;
