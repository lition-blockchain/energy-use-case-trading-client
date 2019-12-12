import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<Loader {...props} />);
}

describe('<Loader /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should display loader', () => {
        const loader = renderComponent({ show: true });

        expect(loader.hasClass('loader-backdrop--show')).toBeTruthy();
    });

    it('should display loader on parent area', () => {
        const loader = renderComponent({ fullScreen: false });

        expect(loader.hasClass('loader-backdrop--full-screen')).toBeFalsy();
    });
});
