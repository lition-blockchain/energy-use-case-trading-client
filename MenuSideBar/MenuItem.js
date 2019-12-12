import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import './MenuItem.css';

const MenuItem = props => {
    const { label, icon, active, subItemActive, disabled, onClick = f => f } = props;
    const classes = classNames({
        'menu-item': true,
        'menu-item--active': active,
        'menu-item--disabled': disabled,
        'menu-subitem--active': subItemActive
    });

    return (
        <a
            aria-label={label}
            className={classes}
            href=""
            onClick={event => {
                event.preventDefault();
                if (!disabled) {
                    onClick();
                }
            }}
        >
            <div className="menu-item-icon">
                <FontAwesomeIcon icon={icon} />
            </div>
            <div className="menu-item-label">
                <span>{label}</span>
            </div>
        </a>
    );
};

MenuItem.propTypes = {
    icon: PropTypes.any,
    label: PropTypes.string,
    active: PropTypes.bool,
    subItemActive: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};

export default MenuItem;
