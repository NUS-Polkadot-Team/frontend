import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';

import { DiamondIcon } from '@/components/Icons/DiamondIcon';
import Link from 'next/link';
import artists from '@/data/artists';

const classifications = artists;

function ImageClipPaths({
  id,
  ...props
}: { id: string } & JSX.IntrinsicElements['svg']) {
  return (
    <svg aria-hidden="true" width={0} height={0} {...props}>
      <defs>
        <clipPath id={`${id}-0`} clipPathUnits="objectBoundingBox">
          <path d="M0,0 h0.729 v0.129 h0.121 l-0.016,0.032 C0.815,0.198,0.843,0.243,0.885,0.243 H1 v0.757 H0.271 v-0.086 l-0.121,0.057 v-0.214 c0,-0.032,-0.026,-0.057,-0.057,-0.057 H0 V0" />
        </clipPath>
        <clipPath id={`${id}-1`} clipPathUnits="objectBoundingBox">
          <path d="M1,1 H0.271 v-0.129 H0.15 l0.016,-0.032 C0.185,0.802,0.157,0.757,0.115,0.757 H0 V0 h0.729 v0.086 l0.121,-0.057 v0.214 c0,0.032,0.026,0.057,0.057,0.057 h0.093 v0.7" />
        </clipPath>
        <clipPath id={`${id}-2`} clipPathUnits="objectBoundingBox">
          <path d="M1,0 H0.271 v0.129 H0.15 l0.016,0.032 C0.185,0.198,0.157,0.243,0.115,0.243 H0 v0.757 h0.729 v-0.086 l0.121,0.057 v-0.214 c0,-0.032,0.026,-0.057,0.057,-0.057 h0.093 V0" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ArtistList() {
  let id = useId();
  let [tabOrientation, setTabOrientation] = useState('horizontal');

  useEffect(() => {
    let xlMediaQuery = window.matchMedia('(min-width: 1024px)');

    function onMediaQueryChange({ matches }: { matches: boolean }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal');
    }

    onMediaQueryChange(xlMediaQuery);
    xlMediaQuery.addEventListener('change', onMediaQueryChange);

    return () => {
      xlMediaQuery.removeEventListener('change', onMediaQueryChange);
    };
  }, []);

  return (
    <section id="artists" aria-labelledby="artists-title">
      <ImageClipPaths id={id} />
      <div className="mx-6 max-w-7xl px-4 sm:px-6 xl:px-8">
        <Tab.Group
          as="div"
          className="mt-14 grid grid-cols-1 items-start gap-y-8 gap-x-8 self-start sm:mt-16 sm:gap-y-16 xl:mt-24 xl:grid-cols-4"
          vertical={tabOrientation === 'vertical'}
        >
          <Tab.Panels className="order-last xl:order-first xl:col-span-3">
            {classifications.map((classification) => (
              <Tab.Panel
                key={classification.description}
                className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-3 [&:not(:focus-visible)]:focus:outline-none"
                unmount={false}
              >
                {classification.artists.map((artist, artistIndex) => (
                  <div key={artistIndex}>
                    <Link href={`/artists/${artist.address}`}>
                      <div className="rounded-4xl group relative h-[17.5rem] transform overflow-hidden">
                        <div
                          className={clsx(
                            'rounded-4xl absolute top-0 left-0 right-4 bottom-6 border transition duration-300 group-hover:scale-95 xl:right-6',
                            [
                              'border-blue-300',
                              'border-indigo-300',
                              'border-sky-300',
                            ][artistIndex % 3]
                          )}
                        />
                        <div
                          className="absolute inset-0 bg-indigo-50"
                          style={{
                            clipPath: `url(#${id}-${artistIndex % 3})`,
                          }}
                        >
                          <Image
                            className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                            src={artist.image}
                            alt={artist.name}
                            width={1024}
                            height={1024}
                            priority
                            sizes="(min-width: 1280px) 17.5rem, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                          />
                        </div>
                      </div>
                      <h3 className="font-display mt-8 text-xl font-bold tracking-tight text-slate-900">
                        {artist.name}
                      </h3>
                      <p className="mt-1 text-base tracking-tight text-slate-500">
                        {artist.description}
                      </p>
                    </Link>
                  </div>
                ))}
              </Tab.Panel>
            ))}
          </Tab.Panels>
          <div className="relative -mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:block sm:overflow-visible sm:pb-0">
            <div className="absolute bottom-0 top-2 left-0.5 hidden w-px bg-slate-200 xl:block" />
            <Tab.List className="grid auto-cols-auto grid-flow-col justify-start gap-x-8 gap-y-10 whitespace-nowrap px-4 sm:mx-auto sm:max-w-2xl sm:grid-cols-3 sm:px-0 sm:text-center xl:grid-flow-row xl:grid-cols-1 xl:text-left">
              {({ selectedIndex }) => (
                <>
                  {classifications.map((classification, currIndex) => (
                    <div
                      key={classification.description}
                      className="relative xl:pl-8"
                    >
                      <DiamondIcon
                        className={clsx(
                          'absolute top-[0.5625rem] left-[-0.5px] hidden h-1.5 w-1.5 overflow-visible xl:block',
                          currIndex === selectedIndex
                            ? 'fill-blue-600 stroke-blue-600'
                            : 'fill-transparent stroke-slate-400'
                        )}
                      />
                      <div className="relative">
                        <div
                          className={clsx(
                            'font-mono text-sm',
                            currIndex === selectedIndex
                              ? 'text-blue-600'
                              : 'text-slate-500'
                          )}
                        >
                          <Tab className="[&:not(:focus-visible)]:focus:outline-none">
                            <span className="absolute inset-0" />
                            {classification.name}
                          </Tab>
                        </div>
                        <div className="mt-1.5 block text-2xl font-semibold tracking-tight text-blue-900">
                          {classification.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Tab.List>
          </div>
        </Tab.Group>
      </div>
    </section>
  );
}
