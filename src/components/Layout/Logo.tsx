import Image from 'next/image';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return <Image alt="logo" src={'/logo.png'} width="50" height="50" />;
}
