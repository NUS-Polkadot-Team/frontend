import { create } from 'ipfs-http-client';

const ipfsClient = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export default ipfsClient;
