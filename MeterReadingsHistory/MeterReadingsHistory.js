import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MONTH_DAY_DATE_FORMAT } from '../../constants';
import Spinner from '../Loader/Spinner';

import './MeterReadingsHistory.css';

const MeterReadingsHistory = ({ title, data, noDataMessage, loading }) => {
    return (
        <div>
            <table className="meter-readings-history">
                <caption>{title}</caption>
                <tbody>
                    {data.map((item, index) => {
                        const isValidNumber = item.value != null && isFinite(item.value);
                        const value = isValidNumber ? parseFloat(item.value) : '-';
                        return (
                            <tr key={`${Date.now()}${index}`}>
                                <td>{item.date ? moment.utc(item.date).format(MONTH_DAY_DATE_FORMAT) : '-'}</td>
                                <td>{value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {loading && (
                <div role="progressbar" aria-hidden={!!loading ? undefined : true} className="meter-readings-loader">
                    <Spinner size="sm" color="#30acc1" />
                </div>
            )}
            {!data.length ? <p>{noDataMessage}</p> : null}
        </div>
    );
};

MeterReadingsHistory.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    noDataMessage: PropTypes.string,
    loading: PropTypes.bool
};

MeterReadingsHistory.defaultProps = {
    data: [],
    title: '-',
    noDataMessage: '-',
    loading: false
};

export default MeterReadingsHistory;
