import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import logoPng from './logo.png';
import logoWebp from './logo.webp';
import './Logo.css';

const Logo = ({ size, className, ...other }) => {
    const classes = classNames('logo', `logo-${size}`, className);

    return (
        <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img className={classes} src={logoPng} alt="Nordic Energy logo" width={174} height={36} {...other} />
        </picture>
    );
};

Logo.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium'])
};
Logo.defaultProps = {
    size: 'medium'
};

export default Logo;
