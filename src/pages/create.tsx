import { Container } from '@/components/Layout/LayoutContainer';
import Head from 'next/head';
import { CreateForm } from '../components/CreateBountyPage/CreateForm';

export type FormData = {
  title: string;
  image?: File;
  description: string;
  prize: number;
  deadline: string;
};

export const customInputStyles = {
  inputField:
    'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200',
  inputLabel: 'block text-sm font-medium text-gray-700',
  submitButton:
    'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
};

export default function CreatePage() {
  return (
    <>
      <Head>
        <title>BountiFi - Create Bounty</title>
        <meta
          name="description"
          content="Building communities of artists, Empowering the creator economy"
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12 ">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Create Bounty
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <CreateForm />
        </div>
      </div>
    </>
  );
}
