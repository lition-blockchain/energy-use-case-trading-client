import React from 'react';
import { shallow } from 'enzyme';
import MeterReadingsHistory from '../MeterReadingsHistory';
import { MONTH_DAY_DATE_FORMAT } from '../../../constants';
import moment from 'moment/moment';
import Spinner from '../../Loader/Spinner';

const MOCK_DATA = {
    count: 8,
    data: [
        {
            id: '17007',
            date: '2018-09-30',
            value: '23'
        },
        {
            date: 1521911833,
            value: 9950.3
        },
        {
            date: '2018-10-22',
            value: 1
        },
        {
            date: '2018-09-29',
            value: -9600.606
        },
        {
            date: 1724911833,
            value: 0
        },
        {
            date: '',
            value: null
        },
        {
            date: undefined,
            value: undefined
        },
        {
            date: '',
            value: 'string'
        }
    ]
};

const DEFAULT_PROPS = {
    data: [],
    title: 'title',
    consumptionUnitLabel: 'label',
    noDataMessage: 'message'
};

function renderComponent(props = {}, renderer = shallow) {
    return renderer(<MeterReadingsHistory {...DEFAULT_PROPS} {...props} />);
}

describe('<MeterReadingsHistory /> Component', () => {
    it(`should contain following elements: 
        - <table /> element;
        - <caption /> element;
        - <tbody /> element;
        - <tr /> elements;
        - <td /> elements;
    `, () => {
        const component = renderComponent({
            data: MOCK_DATA.data
        });

        expect(component.find('table')).toHaveLength(1);
        expect(component.find('caption')).toHaveLength(1);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('tr')).toHaveLength(8);
        expect(component.find('td')).toHaveLength(16);
        expect(component.find(Spinner)).toHaveLength(0);
    });

    it('should render caption with specific title', () => {
        const component = renderComponent({
            title: 'History'
        });

        expect(component.find('caption').text()).toEqual('History');
    });

    it('should render td with specific data', () => {
        const component = renderComponent({
            consumptionUnitLabel: 'kWh',
            data: MOCK_DATA.data
        });

        const trs = component.find('tr');
        let count = 0;

        expect(trs.at(count++).text()).toEqual(`${moment.utc('2018-09-30').format(MONTH_DAY_DATE_FORMAT)}23`);
        expect(trs.at(count++).text()).toEqual(`${moment.utc(1521911833).format(MONTH_DAY_DATE_FORMAT)}9950.3`);
        expect(trs.at(count++).text()).toEqual(`${moment.utc('2018-10-22').format(MONTH_DAY_DATE_FORMAT)}1`);
        expect(trs.at(count++).text()).toEqual(`${moment.utc('2018-09-29').format(MONTH_DAY_DATE_FORMAT)}-9600.606`);
        expect(trs.at(count++).text()).toEqual(`${moment.utc(1724911833).format(MONTH_DAY_DATE_FORMAT)}0`);
        expect(trs.at(count++).text()).toEqual('--');
        expect(trs.at(count++).text()).toEqual('--');
        expect(trs.at(count).text()).toEqual('--');
    });

    it('should render message when data is empty array', () => {
        const component = renderComponent({
            data: [],
            noDataMessage: 'Sorry, not live metering data available for you…'
        });

        expect(component.find('table')).toHaveLength(1);
        expect(component.find('caption')).toHaveLength(1);
        expect(component.find('tbody')).toHaveLength(1);
        expect(component.find('tr')).toHaveLength(0);
        expect(component.find('td')).toHaveLength(0);
        expect(
            component
                .find('p')
                .at(0)
                .text()
        ).toEqual('Sorry, not live metering data available for you…');
    });

    it('should render Spinner when loading', () => {
        renderComponent({
            data: [],
            noDataMessage: 'Sorry, not live metering data available for you…'
        });
        const extendedComponent = renderComponent({ loading: true });

        expect(extendedComponent.find(Spinner)).toHaveLength(1);
    });
});
