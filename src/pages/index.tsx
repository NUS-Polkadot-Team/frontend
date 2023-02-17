import { Footer } from '@/components/Layout/Footer';
import { Header } from '@/components/Layout/Header';
import { Hero } from '@/components/HomePage/Hero';
import { PrimaryFeatures } from '@/components/HomePage/PrimaryFeatures';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title> BountiFi - Home</title>
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
  );
}
