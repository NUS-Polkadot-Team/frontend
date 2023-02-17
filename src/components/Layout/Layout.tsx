import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode, SVGProps } from 'react';
import { GitHubIcon } from '../Icons/GitHubIcon';
import { InstagramIcon } from '../Icons/InstagramIcon';
import { TinyWaveFormIcon } from '../Icons/TinyWaveFormIcon';
import { TwitterIcon } from '../Icons/TwitterIcon';
import { Waveform } from '../Icons/Waveform';
import { AboutSection } from './AboutSection';
import { Button } from './Button';
import WalletButton from './WalletButton';

const links = [
  // ['Spotify', SpotifyIcon],
  // ['Apple Podcast', ApplePodcastIcon],
  // ['Overcast', OvercastIcon],
  // ['RSS Feed', RSSIcon],
  ['Twitter', TwitterIcon, ''],
  ['Instagram', InstagramIcon, ''],
  ['GitHub', GitHubIcon, 'https://github.com/NUS-Polkadot-Team/'],
] as [string, (props: SVGProps<SVGSVGElement>) => JSX.Element, string][];

export function randomBetween(min: number, max: number, seed = 1) {
  return () => {
    let rand = Math.sin(seed++) * 10000;
    rand = rand - Math.floor(rand);
    return Math.floor(rand * (max - min + 1) + min);
  };
}

export function Layout({ children }: { children?: ReactNode }) {
  // get me the route of the current page
  const router = useRouter();
  const route = router.route;

  return (
    <>
      <header className="bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto">
        {/* <div className="hidden lg:sticky lg:top-0 lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <span className="font-mono text-slate-500">Hosted by</span>
          <span className="mt-6 flex gap-6 font-bold text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </span>
        </div> */}
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-200 lg:py-12 lg:px-8 ">
          {/* <Link
            href="/bounty"
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-slate-200 shadow-xl shadow-slate-200 sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <Image
              className="w-full"
              src={posterImage}
              alt=""
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 16rem, 12rem"
              priority
            />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </Link> */}
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-3xl font-extrabold text-slate-900">
              Welcome to BountiFi
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-700">
              Empowering the creator economy - artists and NFT art scene
            </p>
          </div>
          <div className="mt-10 space-y-6">
            <WalletButton />
            <Button
              variant={route === '/bounties' ? 'solid' : 'outline'}
              href="/bounties"
              className="h-12 w-full"
            >
              Bounties
            </Button>
            <Button
              variant={route === '/artists' ? 'solid' : 'outline'}
              href="/artists"
              className="h-12 w-full"
            >
              Artists
            </Button>
            <Button
              variant={route === '/create' ? 'solid' : 'outline'}
              href="/create"
              className="h-12 w-full"
            >
              Create Bounty
            </Button>
            <Button
              variant={route === '/submit' ? 'solid' : 'outline'}
              href="/submit"
              className="h-12 w-full"
            >
              Create Submission
            </Button>
            <Button
              variant={route === '/' ? 'solid' : 'outline'}
              href="/"
              className="h-12 w-full"
            >
              Back to Landing Page
            </Button>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <TinyWaveFormIcon
                colors={['fill-indigo-300', 'fill-blue-300']}
                className="h-2.5 w-2.5"
              />
              <span className="ml-2.5">Connect with us!</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-700 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {links.map(([label, Icon, link]) => (
                <li key={label} className="flex">
                  <Link
                    href={link}
                    className="group flex items-center"
                    aria-label={label}
                    rel="noopener"
                    target={'_blank'}
                  >
                    <Icon className="h-8 w-8 fill-slate-400 group-hover:fill-slate-600" />
                    <span className="hidden sm:ml-3 sm:block">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-200 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0">
        <Waveform className="absolute left-0 top-0 h-20 w-full" />
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-200 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          {/* <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
            {hosts.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </div> */}
        </div>
      </footer>
    </>
  );
}
