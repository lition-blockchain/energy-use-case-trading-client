import React from 'react';
import { shallow } from 'enzyme';
import Illustration from '../Illustration';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<Illustration {...props} />);
}

describe('<Illustration /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders with custom class', () => {
        const component = renderComponent({ className: 'test' });
        expect(component.find('img').hasClass('test')).toBeTruthy();
    });
});
