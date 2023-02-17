export interface Artist {
  joined: string;
  name: string; // title of the artist
  address: string;
  description: string; // description of the artist
  bountiesCompleted: string; // number of bounties completed by the artist
  artworks: string[]; // array of bounty addresses
  image: string; // image of the artist
}

const artists: {
  name: string;
  description: string;
  artists: Artist[];
}[] = [
  {
    name: 'Top Artists',
    description: 'Over 100 Bounties',
    artists: [
      {
        name: 'Steven McHail',
        description: 'Designer at Globex Corporation',
        image: '/avatars/steven-mchail.jpg',
        artworks: [],
        bountiesCompleted: '50',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Jaquelin Isch',
        description: 'UX Design at InGen',
        image: '/avatars/jaquelin-isch.jpg',
        artworks: [],
        bountiesCompleted: '30',
        joined: '2020-02-01',
        address: '0x2',
      },
      {
        name: 'Dianne Guilianelli',
        description: 'General Manager at Initech',
        image: '/avatars/dianne-guilianelli.jpg',
        artworks: [],
        bountiesCompleted: '40',
        joined: '2020-02-01',
        address: '0x63',
      },
      {
        name: 'Ronni Cantadore',
        description: 'Design Engineer at Weyland-Yutani',
        image: '/avatars/ronni-cantadore.jpg',
        artworks: [],
        bountiesCompleted: '25',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Erhart Cockrin',
        description: 'Product Lead at Cyberdyne Systems',
        image: '/avatars/erhart-cockrin.jpg',
        artworks: [],
        bountiesCompleted: '20',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Parker Johnson',
        description: 'UI Designer at MomCorp',
        image: '/avatars/parker-johnson.jpg',
        artworks: [],
        bountiesCompleted: '15',
        joined: '2020-02-01',
        address: '0x1',
      },
    ],
  },
  {
    name: 'Rising Artists',
    description: 'Over 50 Bounties',
    artists: [
      {
        name: 'Damaris Kimura',
        description: 'Senior Engineer at OCP',
        image: '/avatars/damaris-kimura.jpg',
        artworks: [],
        bountiesCompleted: '10',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Ibrahim Frasch',
        description: 'Programmer at Umbrella Corp',
        image: '/avatars/ibrahim-frasch.jpg',
        artworks: [],
        bountiesCompleted: '5',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Cathlene Burrage',
        description: 'Frontend Developer at Buy n Large',
        image: '/avatars/cathlene-burrage.jpg',
        artworks: [],
        bountiesCompleted: '8',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Rinaldo Beynon',
        description: 'Data Scientist at Rekall',
        image: '/avatars/rinaldo-beynon.jpg',
        artworks: [],
        bountiesCompleted: '3',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Waylon Hyden',
        description: 'DevOps at RDA Corporation',
        image: '/avatars/waylon-hyden.jpg',
        artworks: [],
        bountiesCompleted: '2',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Giordano Sagucio',
        description: 'Game Developer at Soylent Corp',
        image: '/avatars/giordano-sagucio.jpg',
        artworks: [],
        bountiesCompleted: '1',
        joined: '2020-02-01',
        address: '0x1',
      },
    ],
  },
  {
    name: 'Recommended Artists',
    description: 'Curated for you',
    artists: [
      {
        name: 'Andrew Greene',
        description: 'Frontend Developer at Ultratech',
        image: '/avatars/andrew-greene.jpg',
        artworks: [],
        bountiesCompleted: '0',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Heather Terry',
        description: 'Backend Developer at Xanatos Enterprises',
        image: '/avatars/heather-terry.jpg',
        artworks: [],
        bountiesCompleted: '0',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Piers Wilkins',
        description: 'Full stack Developer at BiffCo',
        image: '/avatars/piers-wilkins.jpg',
        artworks: [],
        bountiesCompleted: '0',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Gordon Sanderson',
        description: 'Mobile Developer at Cobra Industries',
        image: '/avatars/gordon-sanderson.jpg',
        artworks: [],
        bountiesCompleted: '0',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: 'Kimberly Parsons',
        description: 'Game Developer at Tyrell Corporation',
        image: '/avatars/kimberly-parsons.jpg',
        artworks: [],
        bountiesCompleted: '0',
        joined: '2020-02-01',
        address: '0x1',
      },
      {
        name: "Liam O'Brien",
        description: 'Software Engineer at Omnicorp',
        image: '/avatars/liam-obrien.jpg',
        artworks: [],
        bountiesCompleted: '0',
        joined: '2020-02-01',
        address: '0x1',
      },
    ],
  },
];

export default artists;
