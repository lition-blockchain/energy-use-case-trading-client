import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

import './MenuSideBar.css';

class MenuSideBar extends React.Component {
    selectMenuItem(path) {
        const { onSelect = f => f } = this.props;
        onSelect(path);
    }

    renderMenuItems() {
        const { items = [] } = this.props;
        return items.map(({ id, icon, label, active, subItemActive, path, disabled }, index) => (
            <MenuItem
                key={`${index}-${label}`}
                icon={icon}
                label={label}
                active={active}
                disabled={disabled}
                subItemActive={subItemActive}
                onClick={() => this.selectMenuItem(path)}
            />
        ));
    }

    render() {
        return <nav className="menu-side-bar">{this.renderMenuItems()}</nav>;
    }
}

MenuSideBar.propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func
};

export default MenuSideBar;
