import moment from 'moment/moment';
import { DATE_FORMAT, DATETIME_FORMAT } from '../constants';

export function formatFloat(number, options) {
    // TODO uncomment in future, for current moment we use only EN format
    const locale = /*document.documentElement.getAttribute('lang') ||*/ 'en-EN';
    const defaultOptions = { maximumFractionDigits: 2 };
    return Number(number || '0').toLocaleString(locale, { ...defaultOptions, ...options });
}

export function formatCurrency(value) {
    return formatFloat(value, { minimumFractionDigits: 2 });
}

export function formatDate(value, format = DATE_FORMAT) {
    return moment.utc(new Date(value * 1000)).format(format);
}

export function formatDateTime(value) {
    return moment.utc(new Date(value * 1000)).format(DATETIME_FORMAT);
}
