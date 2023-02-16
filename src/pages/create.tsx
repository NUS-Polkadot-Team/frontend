import { useState, type FormEvent, type ChangeEvent } from 'react';
import Head from 'next/head';

import { Container } from '@/components/LayoutContainer';

type FormData = {
  title: string;
  image?: File;
  description: string;
  prize: number;
  designsRequired: number;
};

function CreateForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    image: undefined,
    description: '',
    prize: 0,
    designsRequired: 1,
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle here
  };

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

  const customInputStyles = {
    inputField:
      'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200',
    inputLabel: 'block text-sm font-medium text-gray-700',
    submitButton:
      'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
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
          Image:
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
        <label
          htmlFor="designsRequired"
          className={customInputStyles.inputLabel}
        >
          Designs Required:
        </label>
        <input
          type="number"
          id="designsRequired"
          name="designsRequired"
          value={formData.designsRequired}
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

export default function create() {
  return (
    <>
      <Head>
        <title>ArtFi - Create</title>
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
        <CreateForm />
      </div>
    </>
  );
}
