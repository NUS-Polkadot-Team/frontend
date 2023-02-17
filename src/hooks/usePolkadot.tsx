import { PolkadotContext } from '@/context/PolkadotContext';
import { useContext } from 'react';

const usePolkadot = () => useContext(PolkadotContext);

export default usePolkadot;
