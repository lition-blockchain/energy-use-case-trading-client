import React from 'react';
import PropTypes from 'prop-types';
import './HeaderButton.css';

const HeaderButton = ({ children, hasIndicator, onClickHandler, icon }) => (
    <div className="header-button-container">
        <button className="header-button" onClick={onClickHandler}>
            <span className="header-button-icon-container">
                {icon}
                {hasIndicator && <span className="header-button-indicator" />}
            </span>
        </button>
        {children}
    </div>
);

HeaderButton.propTypes = {
    children: PropTypes.any,
    hasIndicator: PropTypes.bool,
    onClickHandler: PropTypes.func,
    icon: PropTypes.any
};

export default HeaderButton;
