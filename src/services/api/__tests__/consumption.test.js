import Axios from 'axios';
import { getMeterNumber, getMeterReadingsHistory, submitMeterReading } from '../consumption';

const MOCK_METER_READINGS_HISTORY = {
    count: 4,
    data: [
        {
            id: '17007',
            date: '2018-09-30',
            value: '123456.0000'
        },
        {
            id: '17008',
            date: '2018-09-30',
            value: '123456.0000'
        }
    ]
};

const MOCK_METER_NUMBER = {
    meterNumber: 12345678
};

const MOCK_READING_VALUE = { readingValue: 1111 };

describe('Consumption API Service', () => {
    beforeAll(() => {
        jest.spyOn(Axios, 'get').mockImplementation(jest.fn);
        jest.spyOn(Axios, 'post').mockImplementation(jest.fn);
    });

    afterAll(() => {
        Axios.get.mockRestore();
    });

    afterEach(() => {
        Axios.get.mockClear();
    });

    it('should provide method for getting meter readings history', async () => {
        Axios.get.mockReturnValueOnce(Promise.resolve({ data: MOCK_METER_READINGS_HISTORY.data }));

        const data = await getMeterReadingsHistory(2);

        expect(Axios.get).toHaveBeenCalledWith('/api/consumption/meterReadings', {
            params: { limit: 15, offset: 30 }
        });

        expect(data).toEqual({ data: MOCK_METER_READINGS_HISTORY.data });
    });

    it('should provide method for getting meter number', async () => {
        Axios.get.mockReturnValueOnce(Promise.resolve({ data: MOCK_METER_NUMBER }));
        const data = await getMeterNumber();

        expect(data).toEqual({ data: MOCK_METER_NUMBER });
    });

    it('should provide method for submit meter readings', async () => {
        Axios.post.mockReturnValueOnce(Promise.resolve({ data: MOCK_READING_VALUE }));
        const data = await submitMeterReading({ meterReadings: MOCK_READING_VALUE.readingValue, date: '2019-08-29' });

        expect(data).toEqual({ data: MOCK_READING_VALUE });
    });
});
