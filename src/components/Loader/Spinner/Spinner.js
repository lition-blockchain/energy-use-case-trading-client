import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Spinner.css';

const Spinner = ({ className, color, size }) => {
    const classes = classNames('spinner', `spinner--size-${size}`, className);

    return (
        <svg className={classes} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <circle className="path" style={{ stroke: color }} fill="none" cx={25} cy={25} r={20} strokeWidth={5} />
        </svg>
    );
};

Spinner.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};
Spinner.defaultProps = {
    color: '#cc9900',
    size: 'md'
};

export default Spinner;
