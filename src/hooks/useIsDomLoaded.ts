import { useEffect, useState } from 'react';

const useIsDomLoaded = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    setIsDomLoaded(true);
    return () => {
      setIsDomLoaded(false);
    };
  }, []);
  console.log(isDomLoaded)

  return isDomLoaded;
};
export default useIsDomLoaded;
