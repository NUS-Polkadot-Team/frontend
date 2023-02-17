export interface Bounty {
  published: string; //date the bounty was published
  title: string; // title of the bounty
  address: string; // address of the bounty
  description: string; // description of the bounty
  prize: string; // prize in eth of the bounty
  token: string;
  designsRequired: string; // number of designs required for the bounty
  selectedDesign: string; // address of selected design
  status:
    | 'open'
    | 'started'
    | 'submitted'
    | 'completed'
    | 'expired'
    | 'cancelled';
  deadline: string;
}

const bounties: Bounty[] = [
  {
    published: '2023-02-17',
    title: 'Mr Whitehole Fanart',
    address: 'YU7uQgPaeTvdmBDP97FxPn2kYbaWBtUY5LPJETWX9HA1Mzf',
    description:
      'Request for a custom variant with specific traits and background',
    prize: '0.1',
    token: 'SBY',
    designsRequired: '1',
    selectedDesign: '',
    deadline: '2024-02-17',
    status: 'open',
  },
];

export default bounties;
