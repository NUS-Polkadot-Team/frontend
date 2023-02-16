import Image from 'next/image'
import artfiLogo from '../images/artfi-logo.jpg'

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return <Image alt="logo" src={artfiLogo.src} width="50" height="50" />
}
