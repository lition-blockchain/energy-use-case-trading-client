import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../Logo';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<Logo {...props} />);
}

describe('<Logo /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders with custom class', () => {
        const component = renderComponent({ className: 'PowerChain test' });
        expect(component.find('img').hasClass('test')).toBeTruthy();
    });

    it('should render small logo', () => {
        const component = renderComponent({ size: 'small' });
        expect(component.find('img').hasClass('logo-small')).toBeTruthy();
    });
});
