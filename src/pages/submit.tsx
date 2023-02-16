import { useState, type FormEvent, type ChangeEvent } from 'react';
import Head from 'next/head';

import { Container } from '@/components/Layout/LayoutContainer';
import { customInputStyles } from './create';

type FormValues = {
  bounty: string;
  image: File | null;
  description: string;
};

function SubmitForm() {
  const [formData, setFormData] = useState({
    bounty: '',
    image: null,
    description: '',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFormData({
        ...formData,
        image: event.target.files[0],
      });
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send form data to server here
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex max-w-7xl flex-col space-y-6 px-6 py-6"
    >
      <div>
        <label htmlFor="bounty" className={customInputStyles.inputLabel}>
          Select a bounty:
        </label>
        <select
          id="bounty"
          name="bounty"
          value={formData.bounty}
          onChange={handleInputChange}
          className={customInputStyles.inputField}
          required
        >
          <option value="">Choose a bounty</option>
          {/* map bounties here */}
          <option value="bounty1">Bounty 1</option>
          <option value="bounty2">Bounty 2</option>
          <option value="bounty3">Bounty 3</option>
        </select>
      </div>
      <div>
        <label htmlFor="image" className={customInputStyles.inputLabel}>
          Upload an image (optional):
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
          className={customInputStyles.inputField}
          required
        />
      </div>
      <button type="submit" className={customInputStyles.submitButton}>
        Submit
      </button>
    </form>
  );
}

export default function submit() {
  return (
    <>
      <Head>
        <title>ArtFi - Submit</title>
        <meta
          name="description"
          content="Building communities of artists, Empowering the creator economy"
        />
      </Head>
      <div className="pt-16 pb-12 sm:pb-4 lg:pt-12 ">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Submit Bounty
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          <SubmitForm />
        </div>
      </div>
    </>
  );
}
