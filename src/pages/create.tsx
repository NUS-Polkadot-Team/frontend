import { Container } from '@/components/Layout/LayoutContainer';
import useCreateBounty from '@/hooks/useCreateBounty';
import Head from 'next/head';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import BN from 'bn.js';
import ipfsClient from 'ipfs-http-client';

type FormData = {
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

const SHIBUYA_DECIMALS = 18;

function CreateForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    image: undefined,
    description: '',
    prize: 0,
    deadline: '',
  });
  const { createBounty, data, error } = useCreateBounty();
  const [ipfsHash, setIpfsHash] = useState<string>('');

  const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: '5001',
    protocol: 'https',
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = await ipfs.add(Buffer.from(JSON.stringify(formData)));

    setIpfsHash(file.cid.toString());

    await createBounty(ipfsHash, formData.prize * 10 ** 18);

    // await createBounty(
    //   'Qmde2yQH1VNuDXvAdPFnZnZABSEZwmbSmxkNoBwtazDJUd',
    //   // TODO: fix unsafe number conversion
    //   formData.prize * 10 ** 18
    // );
    if (error) {
      toast.error("Couldn't create bounty, please check if you are logged in.");
      return;
    }
    toast.success(
      <div>
        <h3>Successfully created bounty</h3>
        <span>Address: {data?.toString()}</span>
      </div>
    );
  };
  // toast.success('hello');

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex max-w-7xl flex-col space-y-6 px-6 py-6"
    >
      <div>
        <label htmlFor="title" className={customInputStyles.inputLabel}>
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className={customInputStyles.inputField}
        />
      </div>
      <div>
        <label htmlFor="image" className={customInputStyles.inputLabel}>
          Image (Optional):
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileInputChange}
          className={customInputStyles.inputField}
        />
      </div>
      <div>
        <label htmlFor="description" className={customInputStyles.inputLabel}>
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          className={customInputStyles.inputField}
        />
      </div>
      <div>
        <label htmlFor="prize" className={customInputStyles.inputLabel}>
          Prize:
        </label>
        <input
          type="number"
          id="prize"
          name="prize"
          value={formData.prize}
          onChange={handleInputChange}
          required
          className={customInputStyles.inputField}
        />
      </div>
      <div>
        <label htmlFor="deadline" className={customInputStyles.inputLabel}>
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleInputChange}
          required
          className={customInputStyles.inputField}
        />
      </div>
      <button type="submit" className={customInputStyles.submitButton}>
        Submit
      </button>
    </form>
  );
}

export default function CreatePage() {
  return (
    <>
      <Head>
        <title>BountiFi - Create</title>
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
