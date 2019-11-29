export const PATHS = {
    overview: {
        id: '',
        path: '/'
    },
    documents: {
        id: 'documents',
        path: '/documents'
    },
    submit_meter: {
        id: 'submit_meter',
        path: '/submit_meter'
    },
    trading: {
        id: 'trading',
        path: '/trading'
    },
    directTrading: {
        id: 'direct_trading',
        path: '/direct_trading'
    },
    profile: {
        id: 'profile',
        path: '/profile'
    },
    termsAndConditions: {
        id: 'termsandconditions',
        path: '/termsandconditions'
    },
    about: {
        id: 'about',
        path: '/about'
    },
    faq: {
        id: 'faq',
        path: '/faq'
    },
    myProducer: {
        id: 'my_producer',
        path: '/my_producer'
    },
    producer: {
        id: 'producer',
        path: '/buy_energy/producer/:producerId'
    },
    buyEnergy: {
        id: 'buy_energy',
        path: '/buy_energy'
    },
    sellEnergy: {
        id: 'sell_energy',
        path: '/sell_energy'
    },
    showTransactions: {
        id: 'show_transactions',
        path: '/show_transactions'
    },
    login: {
        id: 'login',
        path: '/login'
    },
    resetPassword: {
        id: 'reset_password',
        path: '/:resetToken/reset-password'
    },
    restorePassword: {
        id: 'restore_password',
        path: '/restore-password'
    }
};

export const KEYBOARD_KEY_VALUES = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    BACKSPACE: 'Backspace',
    DELETE: 'Delete',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    Q: 'KeyQ'
};

export const MOUSE_BUTTONS_VALUES = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};

export const SESSION_API_URL = '/api';

export const PLANT_TYPES = {
    wind: 'wind',
    solar: 'solar',
    biomass: 'biomass',
    default: 'default',
    other: 'other'
};

export const PRODUCER_STATUSES = {
    standard: 'standard',
    soldOut: 'sold out',
    active: 'active'
};

export const LIMIT = 15;

export const TRANSACTION_STATUSES = {
    success: 'success',
    fail: 'failure',
    pending: 'pending',
    waitingForOffer: 'waitingForOffer'
};

export const DATE_FORMAT = 'MMM DD, YYYY';
export const MONTH_DAY_DATE_FORMAT = 'MMM DD';
export const DATETIME_FORMAT = 'MMM DD, YYYY hh:mm';

export const LOCALES = ['fi', 'fi'];
export const [, DEFAULT_LOCALE] = LOCALES;

export const NORDIC_ENERGY_POWERER_PLANT_ID = 1;

export const META_MASK_LINK = 'https://metamask.io';

export const META_MASK_DOWNLOAD_LINKS = {
    chrome: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask',
    opera: 'https://addons.opera.com/en/extensions/details/metamask',
    brave: 'https://brave.com'
};

export const BLOCKCHAIN_NETWORKS = ['ethereum', 'powerchain', 'ledger'];

export const BLOCKCHAIN_SCANNER_URLS = {
    main: 'https://etherscan.io',
    ropsten: 'https://ropsten.etherscan.io'
};

export const TRADE_POSITIONS_LIMIT = 25;

export const PAYMENT_METHODS = {
    debit: 'debit',
    transfer: 'transfer',
    bitcoin: 'bitcoin'
};

// TODO: TBD clarify and setup unknown contract statuses (which have null value)
export const CONTRACT_STATUSES = {
    open: 1000,
    cancellation_previous: 2001,
    delivery_net: 3001,
    waiting: 4000,
    active: 5000,
    blocked: null,
    expired: null,
    terminated: 6000,
    terminated_reasonable_from_customer: 6011,
    terminated_unreasonable_from_customer: 6012,
    terminated_move_with_contract: 6013,
    terminated_reasonable_from_provider: 6021,
    terminated_unreasonable_from_provider: 6022,
    terminated_close_down_from_network_carrier: 6031,
    terminated_move_out_from_netwrok_carrier: 6032,
    terminated_competing_delivery_from_network_carrier: 6033,
    terminated_reasonable_from_evu: 6041,
    terminated_unreasonable_from_evu: 6042,
    terminated_bad_payer_from_evu: 6043,
    done: null,
    cancelled: null
};

export const CONTRACT_STATUS_KEYS_FOR_SAVE_METERING = [
    'active',
    'terminated',
    'terminated_reasonable_from_customer',
    'terminated_unreasonable_from_customer',
    'terminated_move_with_contract',
    'terminated_reasonable_from_provider',
    'terminated_unreasonable_from_provider',
    'terminated_close_down_from_network_carrier',
    'terminated_move_out_from_netwrok_carrier',
    'terminated_competing_delivery_from_network_carrier',
    'terminated_reasonable_from_evu',
    'terminated_unreasonable_from_evu',
    'terminated_bad_payer_from_evu'
];
