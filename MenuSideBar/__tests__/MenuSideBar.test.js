import React from 'react';
import { faHome, faBook, faCalculator, faChartBar, faUser } from '@fortawesome/fontawesome-free-solid';
import MenuItem from '../MenuItem';
import MenuSideBar from '../MenuSideBar';
import { mount } from 'enzyme';

function renderComponent(props) {
    return mount(<MenuSideBar {...props} />);
}

describe('<MenuSideBar /> Component', () => {
    it(`should contains following controls:
        - <MenuItem>;
        - element 'nav';`, () => {
        const items = [
            { icon: faHome, label: 'Item 1' },
            { icon: faBook, label: 'Item 2' },
            { icon: faCalculator, label: 'Item 3' },
            { icon: faChartBar, label: 'Item 4' },
            { icon: faUser, label: 'Item 5' }
        ];
        const props = { items };
        const component = renderComponent(props);
        const text = component.debug();

        expect(component.find(MenuItem).length).toEqual(5);
        expect(text.includes('nav className="menu-side-bar"')).toEqual(true);
    });

    it('should correctly handle on click event', () => {
        const items = [
            { icon: faHome, label: 'Item 1' },
            { icon: faBook, label: 'Item 2' },
            { icon: faCalculator, label: 'Item 3' },
            { icon: faChartBar, label: 'Item 4', path: '/testpath' },
            { icon: faUser, label: 'Item 5' }
        ];
        const props = { items, onSelect: jest.fn() };
        const component = renderComponent(props);
        component
            .find(MenuItem)
            .at(3)
            .simulate('click');
        expect(props.onSelect.mock.calls.length).toEqual(1);
        const [[path]] = props.onSelect.mock.calls;
        expect(path).toEqual('/testpath');
    });

    it('should set default values at missing props and should not throw an error', () => {
        const items = [
            { icon: faHome, label: 'Item 1' },
            { icon: faBook, label: 'Item 2' },
            { icon: faCalculator, label: 'Item 3' },
            { icon: faChartBar, label: 'Item 4', path: '/testpath' },
            { icon: faUser, label: 'Item 5' }
        ];
        const component = renderComponent({ items });
        component
            .find(MenuItem)
            .at(3)
            .simulate('click');
        expect(component.exists()).toBeTruthy();
    });
});
