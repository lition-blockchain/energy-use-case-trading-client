import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/fontawesome-free-solid';
import MenuItem from '../MenuItem';
import { mount } from 'enzyme';

function renderComponent(props) {
    return mount(<MenuItem {...props} />);
}

describe('<MenuItem /> Component', () => {
    it(`should contains following controls:
        - <a>;
        - <FontAwesomeIcon>;
        - element '.menu-item-icon'
        - element '.menu-item-label';`, () => {
        const props = { icon: faCoffee, label: 'Item' };
        const component = renderComponent(props);
        const text = component.debug();

        expect(component.find('a').length).toEqual(1);
        expect(component.find(FontAwesomeIcon).length).toEqual(1);
        expect(text.includes('div className="menu-item-icon"')).toEqual(true);
        expect(text.includes('div className="menu-item-label"')).toEqual(true);
    });

    it('should change style when active', () => {
        const props = { icon: faCoffee, label: 'Item', active: true };
        const component = renderComponent(props);
        expect(component.find('a.menu-item--active').length).toEqual(1);
    });

    it('should handle on click event', () => {
        const props = { icon: faCoffee, label: 'Item', onClick: jest.fn() };
        const component = renderComponent(props);
        component
            .find('.menu-item')
            .at(0)
            .simulate('click');
        expect(props.onClick.mock.calls.length).toEqual(1);
    });

    it('should provide possibility self disabling', () => {
        const props = { icon: faCoffee, label: 'Item', onClick: jest.fn(), disabled: true };
        const component = renderComponent(props);

        expect(component.find('a.menu-item--disabled').length).toEqual(1);
        component
            .find('.menu-item')
            .at(0)
            .simulate('click');
        expect(props.onClick.mock.calls.length).toEqual(0);
    });

    it('should set default values at missing props and should not throw an error', () => {
        const props = { icon: faCoffee, label: 'Item' };
        const component = renderComponent(props);

        component
            .find('.menu-item')
            .at(0)
            .simulate('click');
        expect(component.exists()).toBeTruthy();
    });
});
