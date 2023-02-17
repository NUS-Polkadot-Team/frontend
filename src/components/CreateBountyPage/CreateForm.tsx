import useCreateBounty from '@/hooks/useCreateBounty';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import { FormData, customInputStyles } from '../../pages/create';
import ipfsClient from 'ipfs-http-client';

const SHIBUYA_DECIMALS = 18;
export function CreateForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    image: undefined,
    description: '',
    prize: 0,
    deadline: '',
  });
  const { createBounty, data, error } = useCreateBounty();
  const [ipfsHash, setIpfsHash] = useState<string>('');

  const ipfs = ipfsClient.create({ url: 'https://ipfs.infura.io:5001/api/v0' });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = await ipfs.add(Buffer.from(JSON.stringify(formData)));

    setIpfsHash(file.cid.toString());

    await createBounty(ipfsHash, formData.prize * 10 ** 18);

    // await createBounty(
    //   'Qmde2yQH1VNuDXvAdPFnZnZABSEZwmbSmxkNoBwtazDJUd',
    //   // TODO: fix unsafe number conversion
    //   formData.prize * 10 ** SHIBUYA_DECIMALS
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
