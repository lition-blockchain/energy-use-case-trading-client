MetaMaskAlert example:

```jsx
initialState = { isOpen: false };

const props = {
    links: {
        metamask: 'https://metamask.io',
        chrome: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
        firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask',
        opera: 'https://addons.opera.com/en/extensions/details/metamask',
        brave: 'https://brave.com'
    },
    labels: {
        messageStart: 'Please use a',
        messageTail: 'browser plugin to allow direct energy trading from your client!',
        linksLabel: 'MetaMask for '
    },
    active: state.isOpen,
    onClick: () => setState({ isOpen: false })
};

<div style={{ padding: '2rem' }}>
    <button onClick={() => setState({ isOpen: true })} style={{ padding: '2rem' }}>Open MetaMask Alert</button>
    <MetaMaskAlert {...props} />
</div>
```
