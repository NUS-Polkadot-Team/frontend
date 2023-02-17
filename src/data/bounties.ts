export interface Bounty {
  /** Date the bounty was published */
  published: string;
  /** Title of the bounty */
  title: string;
  /** address of the bounty */
  address: string;
  /** description of the bounty */
  description: string;
  /** Bounty size in token currency */
  prize: string;
  /** Token symbol */
  token: string;
  /** Number of designs required for the bounty */
  designsRequired: string;
  /** Address of design that won the bounty */
  selectedDesign: string; //
  /** Bounty status */
  status:
    | 'open'
    | 'started'
    | 'submitted'
    | 'completed'
    | 'expired'
    | 'cancelled';
  /** Deadline of bounty */
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
