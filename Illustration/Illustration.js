import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import illustrationPng from './Illustration.png';
import illustrationWebp from './Illustration.webp';
import './Illustration.css';

const Illustration = ({ className }) => {
    const classes = classNames('illustration', className);
    return (
        <picture>
            <source srcSet={illustrationWebp} type="image/webp" />
            <img
                className={classes}
                src={illustrationPng}
                width={632}
                height={536}
                alt="Welcome PowerChain application. Delivery energy through device to your home"
            />
        </picture>
    );
};

Illustration.propTypes = {
    className: PropTypes.string
};

export default Illustration;
