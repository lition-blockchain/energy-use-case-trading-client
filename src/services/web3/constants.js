export const META_MASK_NETWORKS = {
    ropsten: 3,
    main: 1
};

export const LEDGERS = {
    ropsten: 'ethereumRopsten',
    main: 'ethereumMain'
};

export const TIMEOUT = 5000;
export const GAS_PRICE = 20000000000; // 20 Gwei
export const GAS = 200000;
export const BUY_ENERGY_METHOD = 'buy_energy(address,uint32,uint32,uint64)';

export const TIMEOUT_ERROR = {
    response: { data: new Error('MetaMask timeout error') }
};

export const NETWORK_ERROR = {
    response: { data: new Error('Network with no Nordic Energy smart contracts') }
};
