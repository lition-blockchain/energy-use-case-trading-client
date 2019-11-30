import React from 'react';
import { SubmitMeter } from '../SubmitMeter';

import { mountWithIntl, shallowWithIntl } from '../../../services/intlTestHelper';
import { MeterReadingForm, MeterReadingsHistory } from '../../../components';
import * as consumptionActions from '../../../action_performers/consumption';
import * as notificationsActionPerformers from '../../../action_performers/notifications';
import * as appActions from '../../../action_performers/app';

const MOCK_METER_READINGS_HISTORY = {
    count: 4,
    readings: [
        {
            id: '17007',
            date: '2018-09-30',
            value: '123456.0000'
        },
        {
            id: '17008',
            date: '2018-09-27',
            value: '123456.0000'
        }
    ]
};

const DEFAULT_PROPS = {
    meterReadingsHistory: {},
    user: {},
    loading: false,
    meterNumber: null,
    submittedMeterReading: {},
    sessionContract: null,
    meterReadingsHistoryLoading: false,
    hasNextReadingsHistory: false,
    error: null,
    errorSubmit: null
};

function renderComponent(props = {}, mountFn = shallowWithIntl) {
    return mountFn(<SubmitMeter {...DEFAULT_PROPS} {...props} />);
}

describe('<SubmitMeter /> Component', () => {
    jest.useFakeTimers();
    const mainContainerMock = document.createElement('div');

    beforeAll(() => {
        // Prevent displaying async-validator warn messages
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    beforeEach(() => {
        consumptionActions.performGetMeterReadingsHistory = jest.fn();
        consumptionActions.performGetMeterNumber = jest.fn();
        consumptionActions.performSubmitMeterReading = jest.fn();
        appActions.performSetupLoaderVisibility = jest.fn();

        jest.spyOn(document, 'getElementById').mockReturnValue(mainContainerMock);
        jest.spyOn(mainContainerMock, 'addEventListener');
        jest.spyOn(mainContainerMock, 'removeEventListener');
    });

    it('should render SubmitMeter with specific components', () => {
        const component = renderComponent();

        expect(component.find(MeterReadingsHistory)).toHaveLength(1);
        expect(component.find(MeterReadingForm)).toHaveLength(1);
        expect(component.find('section')).toHaveLength(2);
        expect(component.find('aside')).toHaveLength(1);
        expect(component.find('h1')).toHaveLength(1);
    });

    it('should call specific actions when component did mount', () => {
        renderComponent();

        expect(consumptionActions.performGetMeterReadingsHistory).toHaveBeenCalledTimes(1);
        const [[page]] = consumptionActions.performGetMeterReadingsHistory.mock.calls;
        expect(page).toBe(0);
        expect(consumptionActions.performGetMeterNumber).toHaveBeenCalledTimes(1);
    });

    it('should handler scroll event', () => {
        const component = renderComponent();
        const handleScrollMock = component.instance().scrollHandler;

        expect(mainContainerMock.addEventListener).toHaveBeenCalledWith('scroll', component.instance().scrollHandler);

        component.unmount();
        expect(mainContainerMock.removeEventListener).toHaveBeenCalledWith('scroll', handleScrollMock);
    });

    it('should set correct scroll container id', () => {
        const component = renderComponent();
        const scrollContainer = component.instance().scrollContainer;

        expect(scrollContainer).toBe('reading-history-container');
    });

    it('should render MeterReadingForm with specific properties', () => {
        const component = renderComponent({
            meterNumber: 123,
            submittedMeterReading: { loading: true, error: null, data: {} },
            sessionContract: { status: 'active' }
        });

        const meterReadingForm = component.find(MeterReadingForm).at(0);
        expect(meterReadingForm).toHaveLength(1);
        expect(meterReadingForm.props().isSuccessfullySubmitted).toEqual(false);
        expect(meterReadingForm.props().errors).toEqual({});
        expect(meterReadingForm.props().disabled).toBe(false);
        expect(meterReadingForm.props().labels).toEqual({
            dateField: 'Date of reading',
            dateHelperText: 'Editing format dd.mm.yyyy',
            dateRequired: 'Date is required',
            header: 'Submit Meter readings',
            historyCaption: 'History',
            loadingErrorMessage: `Can't load meter readings data from Nordic Energy web server. Please contact administrator to resolve the error.`,
            meterNumberTitle: 'Number of meter',
            incorrectMeterNumber: 'Number of meter is still not defined.',
            incorrectContractStatus: 'Submission of meter readings will be enabled with the start of delivery.',
            meterReadingNumber: 'Meter readings is not a number',
            meterReadingsField: 'Meter readings',
            noData: 'There are no meter readings available.',
            submitButton: 'Submit',
            submitErrorMessage: 'An error occurred while sending meter readings',
            successMessage: 'Meter reading value was successfully saved'
        });
        expect(meterReadingForm.props().locale).toEqual('en');
        expect(meterReadingForm.props().numberOfMeter).toEqual(123);
        expect(typeof meterReadingForm.props().onSubmit).toEqual('function');
    });

    it('should render MeterReadingForm with "isSuccessfullySubmitted" is true when meter submitted', () => {
        const component = renderComponent({
            meterNumber: 123,
            submittedMeterReading: { loading: false, error: null, data: {} }
        });

        const meterReadingForm = component.find(MeterReadingForm).at(0);
        expect(meterReadingForm).toHaveLength(1);
        expect(meterReadingForm.props().isSuccessfullySubmitted).toEqual(true);
        expect(meterReadingForm.props().errors).toEqual({});
        expect(meterReadingForm.props().labels).toEqual({
            dateField: 'Date of reading',
            dateHelperText: 'Editing format dd.mm.yyyy',
            dateRequired: 'Date is required',
            header: 'Submit Meter readings',
            historyCaption: 'History',
            loadingErrorMessage: `Can't load meter readings data from Nordic Energy web server. Please contact administrator to resolve the error.`,
            meterNumberTitle: 'Number of meter',
            incorrectMeterNumber: 'Number of meter is still not defined.',
            incorrectContractStatus: 'Submission of meter readings will be enabled with the start of delivery.',
            meterReadingNumber: 'Meter readings is not a number',
            meterReadingsField: 'Meter readings',
            noData: 'There are no meter readings available.',
            submitButton: 'Submit',
            submitErrorMessage: 'An error occurred while sending meter readings',
            successMessage: 'Meter reading value was successfully saved'
        });
        expect(meterReadingForm.props().locale).toEqual('en');
        expect(meterReadingForm.props().numberOfMeter).toEqual(123);
        expect(typeof meterReadingForm.props().onSubmit).toEqual('function');
    });

    it('should call performSubmitMeterReading when meter submitted with correct data', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const meterReading = {
            meterReadings: 123,
            date: 312441234
        };
        const component = renderComponent();

        component
            .find(MeterReadingForm)
            .props()
            .onSubmit(meterReading);

        expect(component.state().errors).toEqual({});
        expect(component.find(MeterReadingForm).props().errors).toEqual({});
        expect(consumptionActions.performSubmitMeterReading).toHaveBeenCalledWith(meterReading);
        component.setProps({
            submittedMeterReading: {
                data: meterReading,
                loading: false,
                error: null
            }
        });
        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            message: 'Meter reading value was successfully saved',
            type: 'success'
        });
    });

    it("should don't call performSubmitMeterReading when meter submitted with incorrect data", () => {
        const meterReading = {
            meterReadings: 123,
            date: 312441234
        };
        const component = renderComponent();

        component
            .find(MeterReadingForm)
            .props()
            .onSubmit({ ...meterReading, meterReadings: undefined });
        expect(component.state().errors).toEqual({
            meterReadings: 'Meter readings is not a number'
        });

        component
            .find(MeterReadingForm)
            .props()
            .onSubmit({ ...meterReading, date: undefined });
        expect(component.state().errors).toEqual({
            date: 'Date is required'
        });
    });

    it('should render MeterReadingsHistory with specific properties', () => {
        const component = renderComponent({
            meterReadingsHistory: MOCK_METER_READINGS_HISTORY
        });

        const meterReadingsHistory = component.find(MeterReadingsHistory);
        expect(meterReadingsHistory).toHaveLength(1);
        expect(meterReadingsHistory.props().data).toEqual(MOCK_METER_READINGS_HISTORY.readings);
        expect(meterReadingsHistory.props().title).toEqual('History');
        expect(meterReadingsHistory.props().noDataMessage).toEqual('There are no meter readings available.');
        expect(meterReadingsHistory.props().loading).toEqual(false);
    });

    it('should map state properties', () => {
        const stateMock = {
            Users: {
                profile: {
                    data: {
                        user: { id: 1 }
                    },
                    loading: false
                }
            },
            Consumption: {
                meterReadingsHistory: {
                    data: MOCK_METER_READINGS_HISTORY,
                    error: null,
                    loading: true
                },
                submittedMeterReading: {
                    data: { readingValue: 200 },
                    error: 'Error message 2',
                    loading: false
                },
                meterNumber: {
                    data: { meterNumber: 321 },
                    error: 'Error message 3',
                    loading: false
                }
            },
            Contracts: {
                sessionContract: {
                    data: null
                }
            }
        };
        const props = SubmitMeter.mapStateToProps(stateMock);

        expect(props.loading).toEqual(
            stateMock.Consumption.submittedMeterReading.loading ||
                stateMock.Consumption.meterNumber.loading ||
                stateMock.Users.profile.loading
        );
        expect(props.error).toEqual(
            stateMock.Consumption.meterReadingsHistory.error || stateMock.Consumption.meterNumber.error
        );

        expect(props.errorSubmit).toEqual(stateMock.Consumption.submittedMeterReading.error);
        expect(props.meterReadingsHistory).toEqual(stateMock.Consumption.meterReadingsHistory.data);
        expect(props.meterNumber).toEqual(stateMock.Consumption.meterNumber.data.meterNumber);
        expect(props.submittedMeterReading).toEqual(stateMock.Consumption.submittedMeterReading);
        expect(props.sessionContract).toEqual(stateMock.Contracts.sessionContract.data);
        expect(props.user).toEqual(stateMock.Users.profile.data.user);
    });

    it('should shows server error if smth is failed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const component = renderComponent();

        component.setProps({
            loading: false,
            error: { message: 'Error message' }
        });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message:
                "Can't load meter readings data from Nordic Energy web server. Please contact administrator to resolve the error."
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should calls performSetupLoaderVisibility when receive new loading property', () => {
        const component = renderComponent();

        component.setProps({ loading: true });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), true);
        component.setProps({ loading: false });
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledWith(expect.anything(), false);
        expect(appActions.performSetupLoaderVisibility).toHaveBeenCalledTimes(2);
    });

    it('should shows server error if authentication is failed', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const component = renderComponent();

        component.setProps({
            loading: false,
            errorSubmit: { message: 'Error message' }
        });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'An error occurred while sending meter readings: [Error message]'
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should shows error when contract status is changed and incorrect', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        const component = renderComponent();

        component.setProps({ sessionContract: { status: 'incorrect' } });

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'Submission of meter readings will be enabled with the start of delivery.'
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should shows error when contract status is incorrect when component did mount', () => {
        jest.spyOn(notificationsActionPerformers, 'performPushNotification').mockImplementation(jest.fn());
        renderComponent({ sessionContract: { status: 'incorrect' } }, mountWithIntl);

        expect(notificationsActionPerformers.performPushNotification).toHaveBeenCalledWith({
            type: 'error',
            message: 'Submission of meter readings will be enabled with the start of delivery.'
        });

        notificationsActionPerformers.performPushNotification.mockRestore();
    });

    it('should render disabled MeterReadingForm when contract status is incorrect', () => {
        const component = renderComponent({ sessionContract: { status: 'incorrect' } });

        const meterReadingForm = component.find(MeterReadingForm).at(0);
        expect(meterReadingForm).toHaveLength(1);
        expect(meterReadingForm.props().disabled).toBe(true);
    });

    it('should call scroll handler of the container', () => {
        const component = renderComponent();
        const dummyEvent = {
            target: {
                scrollTop: 10,
                clientHeight: 10,
                scrollHeight: 10
            }
        };
        component.setProps({
            hasNextReadingsHistory: true,
            meterReadingsHistoryLoading: false
        });
        component.instance().scrollHandler(dummyEvent);
        jest.runAllTimers();
        expect(component.state('page')).toBe(1);
    });

    it('should call performGetMeterReadingsHistory when page changed', () => {
        const component = renderComponent();
        expect(consumptionActions.performGetMeterReadingsHistory).toHaveBeenCalledTimes(1);
        const [[page]] = consumptionActions.performGetMeterReadingsHistory.mock.calls;
        expect(page).toBe(0);

        component.setState({ page: 1 });

        expect(consumptionActions.performGetMeterReadingsHistory).toHaveBeenCalledTimes(2);
        const [, [updatedPage]] = consumptionActions.performGetMeterReadingsHistory.mock.calls;
        expect(updatedPage).toBe(1);
    });
});
