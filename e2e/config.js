const config = {
    host: 'http://localhost:4000',
    credentials: {
        username: 'powerchainuser',
        password: 'powerchain1'
    },
    timeout: 20000,
    headless: true,

    mobileOptions: {
        width: 320,
        height: 568,
        isMobile: true,
        hasTouch: true
    },
    desktopOptions: {
        width: 1280,
        height: 762,
        isMobile: false,
        hasTouch: false
    },
    tvOptions: {
        width: 1920,
        height: 1080,
        isMobile: false,
        hasTouch: false
    },
    tabletOptions: {
        width: 768,
        height: 1024,
        isMobile: true,
        hasTouch: true
    }
};

export default config;
