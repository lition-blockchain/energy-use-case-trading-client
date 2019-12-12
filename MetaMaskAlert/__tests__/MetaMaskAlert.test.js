import React from 'react';
import MetaMaskAlert from '../MetaMaskAlert';
import { mount } from 'enzyme';

function renderComponent(props) {
    return mount(<MetaMaskAlert {...props} />);
}

describe('<MetaMaskAlert /> Component', () => {
    it(`should contains following elements:
        - div[role="alertdialog"] element;
        - <dialog> element;
        - <strong> elements;
        - <a> elements;
        - <ul> element;
        - <li> elements;`, () => {
        const props = {
            active: true,
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
            }
        };
        const component = renderComponent(props);

        expect(component.find('div[role="alertdialog"]')).toHaveLength(1);
        expect(component.find('dialog')).toHaveLength(1);
        expect(component.find('strong')).toHaveLength(2);
        expect(component.find('ul')).toHaveLength(1);
        expect(component.find('li')).toHaveLength(4);
        expect(component.find('.meta-mask-alert--show')).toHaveLength(1);

        const anchors = component.find('a');
        expect(anchors).toHaveLength(5);
        expect(anchors.at(0).text()).toEqual('MetaMask');
        expect(anchors.at(0).props().href).toEqual(props.links.metamask);
        expect(anchors.at(1).text()).toEqual('Google Chrome');
        expect(anchors.at(1).props().href).toEqual(props.links.chrome);
        expect(anchors.at(2).text()).toEqual('Mozilla FireFox');
        expect(anchors.at(2).props().href).toEqual(props.links.firefox);
        expect(anchors.at(3).text()).toEqual('Opera');
        expect(anchors.at(3).props().href).toEqual(props.links.opera);
        expect(anchors.at(4).text()).toEqual('Brave');
        expect(anchors.at(4).props().href).toEqual(props.links.brave);

        const importants = component.find('strong');
        expect(importants.at(0).text()).toEqual(
            'Please use a MetaMask browser plugin to allow direct energy trading from your client!'
        );
        expect(importants.at(1).text()).toEqual('MetaMask for ');

        component.setProps({ active: false });
        expect(component.find('.meta-mask-alert--show')).toHaveLength(0);
    });
});
