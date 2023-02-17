import dynamic from 'next/dynamic';

// needs to be dynamically loaded client side
const Identicon = dynamic(() => import('@polkadot/react-identicon'), {
  ssr: false,
  loading: () => (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-[60px] w-[60px] rounded-full bg-gray-200 dark:bg-gray-600"></div>
    </div>
  ),
});

export default Identicon;
