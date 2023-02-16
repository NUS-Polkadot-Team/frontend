import Head from 'next/head'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'

export default function Home() {
  return (
    <>
      <Head>
        <title> ArtFi - Home</title>
        <meta
          name="description"
          content="Building communities of artists, Empowering the creator economy"
        />
      </Head>
      <Header />
      <main className="w-full max-w-none px-0">
        <Hero />
        <PrimaryFeatures />
      </main>
      <Footer />
    </>
  )
}
