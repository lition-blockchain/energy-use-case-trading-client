import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle';
import './Alert.css';

export default class Alert extends React.Component {
    get defaultCollapseStyle() {
        return {
            overflow: 'hidden',
            height: 0,
            transition: `height ${this.props.duration}ms ease`
        };
    }

    get transitionCollapseStyle() {
        let height = 0;

        if (this.alertRef) {
            const alertStyle = window.getComputedStyle(this.alertRef);
            height = parseInt(alertStyle.height, 10) + parseInt(alertStyle.marginBottom, 10);
        }

        return {
            exited: { height: 0 },
            entering: { height: isNaN(height) ? 0 : height },
            entered: { height: 'auto' }
        };
    }

    constructor(props) {
        super(props);
        this.state = { in: false };
    }

    componentDidMount() {
        setTimeout(() => this.setState({ in: true }));
    }

    render() {
        return (
            <Transition in={this.state.in} timeout={this.props.duration}>
                {state => {
                    const classes = classNames('alert', this.props.className);
                    const style = { ...this.defaultCollapseStyle, ...this.transitionCollapseStyle[state] };

                    return (
                        <div className="alert-collapse" style={style}>
                            <div className={classes} ref={ref => (this.alertRef = ref)} role="alert" aria-live="assertive">
                                <FontAwesomeIcon className="alert-icon" icon={this.props.icon} />
                                <p className="alert-content">{this.props.children}</p>
                            </div>
                        </div>
                    );
                }}
            </Transition>
        );
    }
}

Alert.propTypes = {
    className: PropTypes.string,
    duration: PropTypes.number,
    icon: PropTypes.shape({
        prefix: PropTypes.string,
        iconName: PropTypes.string,
        icon: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]))
    }),
    children: PropTypes.node
};
Alert.defaultProps = {
    duration: 750,
    icon: faInfoCircle
};
