const metadata = {
  source: {
    hash: '0x8edd6f491124999fa920254c198d75cfe61ea76c986453f6006b0aea397d578a',
    language: 'ink! 3.4.0',
    compiler: 'rustc 1.68.0-nightly',
  },
  contract: {
    name: 'bountify',
    version: '0.1.0',
    authors: ['Adithya Narayan <adithyanarayan@skiff.com>'],
  },
  V3: {
    spec: {
      constructors: [
        {
          args: [],
          docs: [],
          label: 'new',
          payable: false,
          selector: '0x9bae9d5e',
        },
      ],
      docs: [],
      events: [
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'id',
              type: {
                displayName: ['u32'],
                type: 1,
              },
            },
            {
              docs: [],
              indexed: true,
              label: 'bidder',
              type: {
                displayName: ['AccountId'],
                type: 4,
              },
            },
            {
              docs: [],
              indexed: false,
              label: 'bid_amount',
              type: {
                displayName: ['Option'],
                type: 8,
              },
            },
            {
              docs: [],
              indexed: false,
              label: 'bid_data',
              type: {
                displayName: ['IpfsHash'],
                type: 7,
              },
            },
          ],
          docs: [],
          label: 'Bid',
        },
        {
          args: [
            {
              docs: [],
              indexed: true,
              label: 'id',
              type: {
                displayName: ['u32'],
                type: 1,
              },
            },
            {
              docs: [],
              indexed: true,
              label: 'asker',
              type: {
                displayName: ['AccountId'],
                type: 4,
              },
            },
            {
              docs: [],
              indexed: true,
              label: 'bidder',
              type: {
                displayName: ['AccountId'],
                type: 4,
              },
            },
            {
              docs: [],
              indexed: false,
              label: 'amount',
              type: {
                displayName: ['u128'],
                type: 9,
              },
            },
          ],
          docs: [],
          label: 'Settle',
        },
      ],
      messages: [
        {
          args: [
            {
              label: 'content',
              type: {
                displayName: ['IpfsHash'],
                type: 7,
              },
            },
            {
              label: 'amount',
              type: {
                displayName: ['Option'],
                type: 8,
              },
            },
          ],
          docs: [],
          label: 'create_bounty',
          mutates: true,
          payable: true,
          returnType: null,
          selector: '0x23168201',
        },
        {
          args: [
            {
              label: 'id',
              type: {
                displayName: ['u32'],
                type: 1,
              },
            },
            {
              label: 'content',
              type: {
                displayName: ['IpfsHash'],
                type: 7,
              },
            },
            {
              label: 'amount',
              type: {
                displayName: ['Option'],
                type: 8,
              },
            },
          ],
          docs: [],
          label: 'bid_for_bounty',
          mutates: true,
          payable: true,
          returnType: null,
          selector: '0x28717dd3',
        },
        {
          args: [
            {
              label: 'id',
              type: {
                displayName: ['u32'],
                type: 1,
              },
            },
          ],
          docs: [],
          label: 'settle',
          mutates: true,
          payable: true,
          returnType: null,
          selector: '0x6c337222',
        },
        {
          args: [
            {
              label: 'id',
              type: {
                displayName: ['u32'],
                type: 1,
              },
            },
            {
              label: 'bidder',
              type: {
                displayName: ['AccountId'],
                type: 4,
              },
            },
            {
              label: 'bid_data',
              type: {
                displayName: ['IpfsHash'],
                type: 7,
              },
            },
          ],
          docs: [],
          label: 'force_set_current_bid',
          mutates: true,
          payable: true,
          returnType: null,
          selector: '0x5b0b4237',
        },
        {
          args: [],
          docs: [],
          label: 'get_bounties',
          mutates: false,
          payable: false,
          returnType: {
            displayName: ['Vec'],
            type: 13,
          },
          selector: '0xc93a176b',
        },
        {
          args: [
            {
              label: 'account_id',
              type: {
                displayName: ['AccountId'],
                type: 4,
              },
            },
          ],
          docs: [],
          label: 'get_bounties_for_user',
          mutates: false,
          payable: false,
          returnType: {
            displayName: ['Vec'],
            type: 13,
          },
          selector: '0x53a0932e',
        },
      ],
    },
    storage: {
      struct: {
        fields: [
          {
            layout: {
              cell: {
                key: '0x0000000000000000000000000000000000000000000000000000000000000000',
                ty: 0,
              },
            },
            name: 'active_bounties',
          },
          {
            layout: {
              cell: {
                key: '0x0100000000000000000000000000000000000000000000000000000000000000',
                ty: 1,
              },
            },
            name: 'bounty_counter',
          },
          {
            layout: {
              cell: {
                key: '0x0200000000000000000000000000000000000000000000000000000000000000',
                ty: 12,
              },
            },
            name: 'bounty_lookup_table',
          },
        ],
      },
    },
    types: [
      {
        id: 0,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: 'offset_key',
                  type: 11,
                  typeName: 'Key',
                },
              ],
            },
          },
          params: [
            {
              name: 'K',
              type: 1,
            },
            {
              name: 'V',
              type: 2,
            },
          ],
          path: ['ink_storage', 'lazy', 'mapping', 'Mapping'],
        },
      },
      {
        id: 1,
        type: {
          def: {
            primitive: 'u32',
          },
        },
      },
      {
        id: 2,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: 'id',
                  type: 1,
                  typeName: 'u32',
                },
                {
                  name: 'ask',
                  type: 3,
                  typeName: 'AskBid',
                },
                {
                  name: 'current_bid',
                  type: 10,
                  typeName: 'Option<AskBid>',
                },
              ],
            },
          },
          path: ['bountify', 'types', 'Bounty'],
        },
      },
      {
        id: 3,
        type: {
          def: {
            composite: {
              fields: [
                {
                  name: 'doer',
                  type: 4,
                  typeName: 'AccountId',
                },
                {
                  name: 'data',
                  type: 7,
                  typeName: 'IpfsHash',
                },
                {
                  name: 'amount',
                  type: 8,
                  typeName: 'Option<u128>',
                },
              ],
            },
          },
          path: ['bountify', 'types', 'AskBid'],
        },
      },
      {
        id: 4,
        type: {
          def: {
            composite: {
              fields: [
                {
                  type: 5,
                  typeName: '[u8; 32]',
                },
              ],
            },
          },
          path: ['ink_env', 'types', 'AccountId'],
        },
      },
      {
        id: 5,
        type: {
          def: {
            array: {
              len: 32,
              type: 6,
            },
          },
        },
      },
      {
        id: 6,
        type: {
          def: {
            primitive: 'u8',
          },
        },
      },
      {
        id: 7,
        type: {
          def: {
            primitive: 'str',
          },
        },
      },
      {
        id: 8,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: 'None',
                },
                {
                  fields: [
                    {
                      type: 9,
                    },
                  ],
                  index: 1,
                  name: 'Some',
                },
              ],
            },
          },
          params: [
            {
              name: 'T',
              type: 9,
            },
          ],
          path: ['Option'],
        },
      },
      {
        id: 9,
        type: {
          def: {
            primitive: 'u128',
          },
        },
      },
      {
        id: 10,
        type: {
          def: {
            variant: {
              variants: [
                {
                  index: 0,
                  name: 'None',
                },
                {
                  fields: [
                    {
                      type: 3,
                    },
                  ],
                  index: 1,
                  name: 'Some',
                },
              ],
            },
          },
          params: [
            {
              name: 'T',
              type: 3,
            },
          ],
          path: ['Option'],
        },
      },
      {
        id: 11,
        type: {
          def: {
            composite: {
              fields: [
                {
                  type: 5,
                  typeName: '[u8; 32]',
                },
              ],
            },
          },
          path: ['ink_primitives', 'Key'],
        },
      },
      {
        id: 12,
        type: {
          def: {
            sequence: {
              type: 1,
            },
          },
        },
      },
      {
        id: 13,
        type: {
          def: {
            sequence: {
              type: 2,
            },
          },
        },
      },
    ],
  },
};

export default metadata;
