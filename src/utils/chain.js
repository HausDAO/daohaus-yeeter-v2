export const supportedChains = {
  '0x1': {
    name: 'Mainnet',
    short_name: 'eth',
    nativeCurrency: 'ETH',
    network: 'mainnet',
    network_id: 1,
    chain_id: '0x1',
    hub_sort_order: 1,
    providers: ['walletconnect'],
    // , 'portis', 'fortmatic'
    rpc_url: `https://${process.env.REACT_APP_RPC_URI}.eth.rpc.rivet.cloud/`,
    abi_api_url:
      'https://api.etherscan.io/api?module=contract&action=getabi&address=',
    tokenlist_api_url: 'https://api.etherscan.io/api',
    subgraph_url: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.REACT_APP_GRAPH_KEY}/subgraphs/id/B4YHqrAJuQ1yD2U2tqgGXWGWJVeBrD25WRus3o9jLLBJ`,
    stats_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats',
    boosts_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts',
    erc721_graph_url:
      'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc721-subgraph',
    erc1155_graph_url:
      'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc1155-subgraph',
    shaman_graph_url: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.REACT_APP_GRAPH_KEY}/subgraphs/id/By8ySivLczH4awGbLz6BcfSnAeUr7JW6NBcAYnbm3AMk`,
    minion_factory_addr: '0x88207Daf515e0da1A32399b3f92D128B1BF45294',
    moloch_factory_addr: '0x38064F40B20347d58b326E767791A6f79cdEddCe',
    dai_contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
    wrapper_contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    wrap_n_zap_factory_addr: '0x4e521FF388c83b4c945a33984ba42Efb73Cc04e6',
    block_explorer: 'https://etherscan.io',
    rarible: {
      api_url: 'https://ethereum-api.rarible.org/v0.1',
      erc20_transfer_proxy: '0xb8e4526e0da700e9ef1f879af713d691f81507d8',
      nft_transfer_proxy: '0x4fee7b061c97c9c496b01dbce9cdb10c02f0a0be',
      base_url: 'https://rarible.com',
    },
    niftyMinion: {
      minion_factory_addr: '0x7EDfBDED3077Bc035eFcEA1835359736Fa342209',
      version: 'v1',
    },
    safeMinion: {
      minion_factory_addr: '0xbC37509A283E2bb67fd151c34E72e826C501E108',
      safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
      safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
    },
    escrow_minion: '0xc9f9E7FC92A7D3B2b3554be850fFF462B7b382E7',
    disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
  },
  '0x64': {
    name: 'Gnosis Chain',
    short_name: 'xdai',
    nativeCurrency: 'xDai',
    network: 'xdai',
    network_id: 100,
    chain_id: '0x64',
    hub_sort_order: 2,
    providers: ['walletconnect'],
    rpc_url: ' https://rpc.gnosischain.com',
    abi_api_url:
      'https://blockscout.com/xdai/mainnet/api?module=contract&action=getabi&address=',
    tokenlist_api_url: 'https://blockscout.com/xdai/mainnet/api',
    subgraph_url: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.REACT_APP_GRAPH_KEY}/subgraphs/id/2GJY9uxsLQUCvgqSfy6QCLAJgM9P9kdxBUpwNcGs7nPR`,
    stats_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-xdai',
    boosts_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts-xdai',
    erc721_graph_url:
      'https://api.thegraph.com/subgraphs/name/sunguru98/erc721-xdai-subgraph',
    erc1155_graph_url:
      'https://api.thegraph.com/subgraphs/name/sunguru98/erc1155-xdai-subgraph',
    poap_graph_url:
      'https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai',
    shaman_graph_url: `https://gateway-arbitrum.network.thegraph.com/api/${process.env.REACT_APP_GRAPH_KEY}/subgraphs/id/5PDcyJVqjrxxwDcWTm88oaw9ktHrKT68SVKj2Gx9366D`,
    minion_factory_addr: '0x53508D981439Ce6A3283597a4775F6f23504d4A2',
    moloch_factory_addr: '0x0F50B2F3165db96614fbB6E4262716acc9F9e098',
    wrapper_contract: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    wrap_n_zap_factory_addr: '0x8464135c8F25Da09e49BC8782676a84730C318bC',
    escrow_minion: '0xc9f9E7FC92A7D3B2b3554be850fFF462B7b382E7',
    block_explorer: 'https://blockscout.com/poa/xdai',
    safeMinion: {
      minion_factory_addr: '0xA1b97D22e22507498B350A9edeA85c44bA7DBC01',
      safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
      safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
    },
    uberhaus_minion_factory_addr: '0xf5106077892992B84c33C35CA8763895eb80B298',
    transmutation_factory_addr: '0x7F94ec015665743fE84A7f59297eD86A0470e069',
    superfluid: {
      minion_factory_addr: '0xfC86DfDd3b2e560729c78b51dF200384cfe87438',
      resolver: '0xD2009765189164b495c110D61e4D301729079911',
      subgraph_url:
        'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-xdai',
      superapp_addr: {
        v1: '0x9fc9420F277b7C25E17B67008b35CCB01c5c9B63',
      },
      version: 'v1',
    },
    niftyMinion: {
      minion_factory_addr: '0xA6B75C3EBfA5a5F801F634812ABCb6Fd7055fd6d',
      version: 'v1',
    },
    disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
    dao_conditional_helper_addr: '0x55c8F8a71aD01FC707Bbb1A04d2c0Ef246973392',
  },
  // '0x5': {
  //   name: 'Göerli',
  //   short_name: 'göerli',
  //   nativeCurrency: 'GOR',
  //   network: 'goerli',
  //   networkAlt: 'goerli',
  //   network_id: 5,
  //   chain_id: '0x5',
  //   hub_sort_order: 9,
  //   providers: ['walletconnect'],
  //   rpc_url: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
  //   abi_api_url:
  //     'https://api.goerli.etherscan.io/api?module=contract&action=getabi&address=',
  //   tokenlist_api_url: 'https://api.goerli.etherscan.io/api',
  //   subgraph_url:
  //     'https://thegraph.com/hosted-service/subgraph/odyssy-automaton/daohaus-goerli',
  //   stats_graph_url:
  //     'https://thegraph.com/hosted-service/subgraph/odyssy-automaton/daohaus-stats-goerli',
  //   boosts_graph_url:
  //     'https://thegraph.com/hosted-service/subgraph/odyssy-automaton/daohaus-boosts-goerli',
  //   // TODO update graph endpoints when ready
  //   // erc721_graph_url:
  //   //   'https://api.thegraph.com/subgraphs/name/sunguru98/matic-erc721-subgraph',
  //   // erc1155_graph_url:
  //   //   'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc1155-matic-subgraph',
  //   moloch_factory_addr: '0x72B8Bf40C8B316753a3E470689DA625759D2b025',
  //   wrapper_contract: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  //   wrap_n_zap_factory_addr: '0xf89f79A0E5aF89BFa5c4d4FC6F7fD25700bC4905',
  //   escrow_minion: '0xceE7f251Bd38B21E8F71C1d62cFbb18219a7F606',
  //   block_explorer: 'https://goerli.etherscan.io/',
  //   safeMinion: {
  //     minion_factory_addr: '0x121931c0Bc458A5f13F3861444AeB036cc8a5363',
  //     safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
  //     safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
  //   },
  //   disperse_app: '0x3D0e848b6C55153E2b0154734ac6b5288A7f1B6F',
  //   poster: '0x3c1f4802be7e26d95b31ef7a566e18f42e360cab',
  // },
  // '0xa': {
  //   name: 'Optimism Mainnet',
  //   short_name: 'optimism',
  //   nativeCurrency: 'ETH',
  //   network: 'optimism',
  //   network_id: 10,
  //   chain_id: '0xa',
  //   hub_sort_order: 4, // TODO not sure what to set this as
  //   providers: ['walletconnect'],
  //   // , 'portis', 'fortmatic'
  //   rpc_url: 'https://mainnet.optimism.io',
  //   abi_api_url:
  //     'https://api-optimistic.etherscan.io/api?module=contract&action=getabi&address=',
  //   tokenlist_api_url: 'https://api-optimistic.etherscan.io/api',
  //   subgraph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-optimism',
  //   stats_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-optimism',
  //   boosts_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts-optimism',
  //   erc721_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc721-optimism-subgraph',
  //   erc1155_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc1155-optimism-subgraph',
  //   minion_factory_addr: '0xc7286c3D9dBe3abD50Ac99E2860D3e750B755dcd',
  //   moloch_factory_addr: '0x032865ACfc05E769902Fe90Bcc9d511875a74E66',
  //   dai_contract: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
  //   wrapper_contract: '0x4200000000000000000000000000000000000006',
  //   wrap_n_zap_factory_addr: '0x5D1ADccB9092eFc65E094Dd8972Bc0d9224b3C41',
  //   block_explorer: 'https://optimistic.etherscan.io',
  //   niftyMinion: {
  //     minion_factory_addr: '', // TODO add address post deployment
  //     version: 'v1',
  //   },
  //   safeMinion: {
  //     minion_factory_addr: '0x8C0463EAfc0B91d7A246CA391Dc4f81E9E6Bd029',
  //     safe_mutisend_addr: '0x998739BFdAAdde7C933B942a68053933098f9EDa',
  //     safe_sign_lib_addr: '0x98FFBBF51bb33A056B08ddf711f289936AafF717',
  //   },
  //   superfluid: {
  //     cfa: '0x204C6f131bb7F258b2Ea1593f5309911d8E458eD',
  //     host: '0x567c4B141ED61923967cA25Ef4906C8781069a10',
  //     resolver: '0x743B5f46BC86caF41bE4956d9275721E0531B186',
  //     subgraph_url_v2:
  //       'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-optimism-mainnet',
  //     supertoken_factory: '0x8276469A443D5C6B7146BED45e2abCaD3B6adad9',
  //   },
  //   escrow_minion: '', // TODO team will add
  //   disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
  //   moloch_token_factory: '0xdb0f2d9ef30ffae97474d6db8c1f0e999934737d',
  //   zodiac_amb_module: {
  //     amb_bridge_address: {
  //       '0xa': '', // TODO team will add
  //     },
  //     foreign_networks: [
  //       {
  //         name: 'optimism',
  //         value: '0xa',
  //       },
  //     ],
  //     gas_limit: {
  //       '0xa': '2000000',
  //     },
  //     monitoring_app: {
  //       '0xa': '', // TODO team will add
  //     },
  //   },
  // },
  // '0x2a': {
  //   name: 'Ethereum Kovan',
  //   short_name: 'kovan',
  //   nativeCurrency: 'ETH',
  //   network: 'kovan',
  //   network_id: 42,
  //   chain_id: '0x2a',
  //   hub_sort_order: 7,
  //   providers: ['walletconnect'],
  //   // , 'portis', 'fortmatic'
  //   rpc_url: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_PROJECT_ID}`,
  //   abi_api_url:
  //     'https://api-kovan.etherscan.io/api?module=contract&action=getabi&address=',
  //   tokenlist_api_url: 'https://api-kovan.etherscan.io/api',
  //   subgraph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-kovan',
  //   stats_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-kovan',
  //   boosts_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts-kovan',
  //   erc721_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/sunguru98/erc721-kovan-subgraph',
  //   erc1155_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc1155-kovan-subgraph',
  //   shaman_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-shamans-rinkeby',
  //   minion_factory_addr: '0xCE63803E265617c55567a7A7b584fF2dbD76210B',
  //   uberhaus_minion_factory_addr: '0x03042577463E3820F9cA6Ca3906BAad599ba9382',
  //   transmutation_factory_addr: '0xbca622291fFe797C77a8Bc6D000584b22877e971',
  //   moloch_factory_addr: '0x9c5d087f912e7187D9c75e90999b03FB31Ee17f5',
  //   dai_contract: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
  //   wrapper_contract: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
  //   wrap_n_zap_factory_addr: '0xbf9e327d465A4A160fA7805282Fb8C7aB892770a',
  //   escrow_minion: '0xc9f9e7fc92a7d3b2b3554be850fff462b7b382e7',
  //   block_explorer: 'https://kovan.etherscan.io',
  //   safeMinion: {
  //     minion_factory_addr: '0xA1b97D22e22507498B350A9edeA85c44bA7DBC01',
  //     safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
  //     safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
  //   },
  //   disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
  // },
  // '0x89': {
  //   name: 'Matic',
  //   short_name: 'matic',
  //   nativeCurrency: 'MATIC',
  //   network: 'matic',
  //   networkAlt: 'polygon',
  //   network_id: 137,
  //   chain_id: '0x89',
  //   hub_sort_order: 3,
  //   providers: ['walletconnect'],
  //   rpc_url: 'https://polygon-rpc.com/',
  //   abi_api_url:
  //     'https://api.polygonscan.com/api?module=contract&action=getabi&address=',
  //   tokenlist_api_url: 'https://api.polygonscan.com/api',
  //   subgraph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-matic',
  //   stats_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-matic',
  //   boosts_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts-matic',
  //   erc721_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/sunguru98/matic-erc721-subgraph',
  //   erc1155_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc1155-matic-subgraph',
  //   shaman_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-shamans-rinkeby',
  //   minion_factory_addr: '0x02e458B5eEF8f23e78AefaC0F15f5d294C3762e9',
  //   moloch_factory_addr: '0x6690C139564144b27ebABA71F9126611a23A31C9',
  //   dai_contract: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  //   wrapper_contract: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  //   wrap_n_zap_factory_addr: '0xbf9e327d465A4A160fA7805282Fb8C7aB892770a',
  //   escrow_minion: '0xc9f9e7fc92a7d3b2b3554be850fff462b7b382e7',
  //   block_explorer: 'https://polygonscan.com',
  //   safeMinion: {
  //     minion_factory_addr: '0xA1b97D22e22507498B350A9edeA85c44bA7DBC01',
  //     safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
  //     safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
  //   },
  //   superfluid: {
  //     minion_factory_addr: '0x52acf023d38A31f7e7bC92cCe5E68d36cC9752d6',
  //     resolver: '0xE0cc76334405EE8b39213E620587d815967af39C',
  //     subgraph_url:
  //       'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-matic',
  //     superapp_addr: {
  //       v1: '0xdb4D89F2199b9Cf451B7Ff4bdC94b1c96De4bdD0',
  //     },
  //     version: 'v1',
  //   },
  //   niftyMinion: {
  //     minion_factory_addr: '0x4CCaDF3f5734436B28869c27A11B6D0F4776bc8E',
  //     version: 'v1',
  //   },
  //   disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
  // },
  // '0xa4b1': {
  //   name: 'Arbitrum',
  //   short_name: 'arb1',
  //   nativeCurrency: 'ETH',
  //   network: 'arbitrum',
  //   network_id: 42161,
  //   chain_id: '0xa4b1',
  //   hub_sort_order: 3,
  //   providers: ['walletconnect'],
  //   rpc_url: 'https://arb1.arbitrum.io/rpc',
  //   abi_api_url:
  //     'https://api.arbiscan.io/api?module=contract&action=getabi&address=',
  //   tokenlist_api_url: 'https://api.arbiscan.io/api',
  //   subgraph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-arbitrum',
  //   stats_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-arbitrum',
  //   boosts_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts-arbitrum',
  //   erc721_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc721-arbitrum-subgraph',
  //   erc1155_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc1155-arbitrum-subgraph',
  //   minion_factory_addr: '',
  //   moloch_factory_addr: '0x9232dea84e91b49fef6b604eea0455692fc27ba8',
  //   dai_contract: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  //   wrapper_contract: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  //   wrap_n_zap_factory_addr: '0xff0184056B7865F924ea3c0C1823882ad388421b',
  //   escrow_minion: '0xc9f9E7FC92A7D3B2b3554be850fFF462B7b382E7',
  //   block_explorer: 'https://arbiscan.io/',
  //   safeMinion: {
  //     minion_factory_addr: '0xA1b97D22e22507498B350A9edeA85c44bA7DBC01',
  //     safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
  //     safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
  //   },
  //   superfluid: {
  //     cfa: '0x731FdBB12944973B500518aea61942381d7e240D',
  //     host: '0xCf8Acb4eF033efF16E8080aed4c7D5B9285D2192',
  //     resolver: '0x609b9d9d6Ee9C3200745A79B9d3398DBd63d509F',
  //     subgraph_url_v2:
  //       'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-arbitrum-one',
  //     supertoken_factory: '0x1C21Ead77fd45C84a4c916Db7A6635D0C6FF09D6',
  //   },
  //   niftyMinion: {
  //     minion_factory_addr: '0xA92CbC525EabFa5baE4e0ff7bDa8E011B43B9aCC',
  //     version: 'v1',
  //   },
  //   disperse_app: '0x692B5A7eCcCad243a07535E8C24B0E7433238C6a',
  //   moloch_token_factory: '0x691086c17418589688f0d3031cfc8d9400df8817',
  //   dao_conditional_helper_addr: '0xF5fb9ce16dbf5B0a7b632Ed5D3F0278E0043B7AE',
  // },
  // '0xa4ec': {
  //   name: 'Celo',
  //   short_name: 'celo',
  //   nativeCurrency: 'CELO',
  //   network: 'celo',
  //   network_id: 42220,
  //   chain_id: '0xa4ec',
  //   hub_sort_order: 5,
  //   providers: ['walletconnect'],
  //   rpc_url: 'https://forno.celo.org',
  //   abi_api_url:
  //     'https://explorer.celo.org/api?module=contract&action=getabi&address=',
  //   tokenlist_api_url: 'https://explorer.celo.org/api',
  //   subgraph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-celo',
  //   stats_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-celo',
  //   boosts_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts-celo',
  //   erc721_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc721-celo-subgraph',
  //   erc1155_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc1155-celo-subgraph',
  //   shaman_graph_url:
  //     'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-shamans-rinkeby',
  //   minion_factory_addr: '0xaD791Ef059A25b6C82e56977C6489974333C5A0C',
  //   moloch_factory_addr: '0x8c47bD2ABae16323054a19aA562efC87A6c26d29', // moloch v2.1.sol
  //   dai_contract: '0x765de816845861e75a25fca122bb6898b8b1282a', // This is cUSD for Celo
  //   wrapper_contract: '0x471ece3750da237f93b8e339c536989b8978a438',
  //   wrap_n_zap_factory_addr: '0x07269699bc441fc97d12d5478cb09522ef32f76a',
  //   block_explorer: 'https://explorer.celo.org',
  //   niftyMinion: {
  //     minion_factory_addr: '0xad791ef059a25b6c82e56977c6489974333c5a0c',
  //     version: 'v1',
  //   },
  //   safeMinion: {
  //     minion_factory_addr: '',
  //     safe_mutisend_addr: '',
  //     safe_sign_lib_addr: '',
  //   },
  //   superfluid: {
  //     minion_factory_addr: '',
  //     resolver: '',
  //     subgraph_url: '',
  //     superapp_addr: {
  //       v1: '',
  //     },
  //     version: 'v1',
  //   },
  //   disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
  // },
};

export const chainByID = chainID => supportedChains[chainID];
export const getGraphEndpoint = (chainID, endpointType) =>
  chainByID(chainID)[endpointType];

export const chainByNetworkId = networkId => {
  const idMapping = {
    1: supportedChains['0x1'],
    5: supportedChains['0x5'],
    10: supportedChains['0xa'],
    74: supportedChains['0x4a'],
    100: supportedChains['0x64'],
    137: supportedChains['0x89'],
    42161: supportedChains['0xa4b1'],
    42220: supportedChains['0xa4ec'],
  };

  return idMapping[networkId];
};

export const chainByName = networkName => {
  const networkKey = Object.keys(supportedChains).find(chainId => {
    return supportedChains[chainId].network === networkName;
  });

  return supportedChains[networkKey];
};

export const MM_ADDCHAIN_DATA = {
  '0xa': {
    chainId: '0xa',
    chainName: 'Optimism',
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
    nativeCurrency: {
      name: 'ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  '0x89': {
    chainId: '0x89',
    chainName: 'Matic Mainnet',
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    blockExplorerUrls: ['https://explorer.matic.network/'],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  '0x64': {
    chainId: '0x64',
    chainName: 'xDai',
    rpcUrls: ['https://dai.poa.network'],
    blockExplorerUrls: ['https://blockscout.com/poa/xdai'],
    nativeCurrency: {
      name: 'xDai',
      symbol: 'XDAI',
      decimals: 18,
    },
  },
  '0x4a': {
    chainId: '0x4a',
    chainName: 'IDchain',
    rpcUrls: ['https://idchain.one/rpc/'],
    blockExplorerUrls: ['https://explorer.idchain.one'],
    nativeCurrency: {
      name: 'eidi',
      symbol: 'EIDI',
      decimals: 18,
    },
  },
  '0xa4b1': {
    chainId: '0xa4b1',
    chainName: 'Arbitrum',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
    nativeCurrency: {
      name: 'ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  '0xa4ec': {
    chainId: '0xa4ec',
    chainName: 'Celo',
    rpcUrls: ['https://forno.celo.org'],
    blockExplorerUrls: ['https://explorer.celo.org'],
    nativeCurrency: {
      name: 'celo',
      symbol: 'CELO',
      decimals: 18,
    },
  },
};

export const EIP3085 = {
  SUPPORTED: {
    '0xa': true,
    '0x64': true,
    '0x89': true,
    '0x4a': true,
    '0xa4b1': true,
    '0xa4ec': true,
  },
  NOT_SUPPORTED: {
    '0x1': true,
    '0x5': true,
  },
};

export const NIFTYINK_ADDRESS = '0xcf964c89f509a8c0ac36391c5460df94b91daba5';
