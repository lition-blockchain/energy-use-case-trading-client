import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../Spinner';

function renderComponent(props = {}, mountFn = shallow) {
    return mountFn(<Spinner {...props} />);
}

describe('<Spinner /> component', () => {
    it('should renders without errors', () => {
        renderComponent();
    });

    it('should renders with different sizes', () => {
        let spinner = renderComponent();
        expect(spinner.hasClass('spinner--size-md')).toBeTruthy();

        spinner = renderComponent({ size: 'sm' });
        expect(spinner.hasClass('spinner--size-sm')).toBeTruthy();

        spinner = renderComponent({ size: 'lg' });
        expect(spinner.hasClass('spinner--size-lg')).toBeTruthy();
    });
});
