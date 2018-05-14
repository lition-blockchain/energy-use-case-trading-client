import moment from 'moment/moment';
import { DATE_FORMAT, DATETIME_FORMAT } from '../constants';

export function formatFloat(number, options) {
    // TODO uncomment in future, for current moment we use only DE format
    const locale = /*document.documentElement.getAttribute('lang') ||*/ 'de-DE';
    const defaultOptions = { maximumFractionDigits: 2 };
    return Number(number || '0').toLocaleString(locale, { ...defaultOptions, ...options });
}

export function formatCurrency(value) {
    return formatFloat(value, { minimumFractionDigits: 2 });
}

export function formatDate(value) {
    return moment(new Date(value * 1000)).format(DATE_FORMAT);
}

export function formatDateTime(value) {
    return moment(new Date(value * 1000)).format(DATETIME_FORMAT);
}
