import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './MetaMaskAlert.css';

const MetaMaskAlert = props => {
    const { labels, links, active, ...others } = props;
    const classes = classNames({
        'meta-mask-alert': true,
        'meta-mask-alert--show': active
    });

    return (
        <div
            className={classes}
            role="alertdialog"
            aria-hidden={!!active ? undefined : true}
            aria-live="assertive"
            {...others}
        >
            <dialog className="meta-mask-alert-dialog" open={active}>
                <strong className="meta-mask-alert-message">
                    {labels.messageStart}{' '}
                    <a href={links.metamask} target="_blank" rel="external noopener noreferrer" translate="no">
                        MetaMask
                    </a>{' '}
                    {labels.messageTail}
                </strong>
                <div className="meta-mask-alert-links">
                    <strong id="meta-mask-browser-extensions">{labels.linksLabel}</strong>
                    <ul translate="no" aria-labelledby="meta-mask-browser-extensions">
                        <li>
                            <a href={links.chrome} target="_blank" rel="external noopener noreferrer">
                                Google Chrome
                            </a>
                        </li>
                        <li>
                            <a href={links.firefox} target="_blank" rel="external noopener noreferrer">
                                Mozilla FireFox
                            </a>
                        </li>
                        <li>
                            <a href={links.opera} target="_blank" rel="external noopener noreferrer">
                                Opera
                            </a>
                        </li>
                        <li>
                            <a href={links.brave} target="_blank" rel="external noopener noreferrer">
                                Brave
                            </a>
                        </li>
                    </ul>
                </div>
            </dialog>
        </div>
    );
};

MetaMaskAlert.propTypes = {
    links: PropTypes.shape({
        metamask: PropTypes.string,
        chrome: PropTypes.string,
        firefox: PropTypes.string,
        opera: PropTypes.string,
        brave: PropTypes.string
    }),
    labels: PropTypes.shape({
        messageStart: PropTypes.string,
        messageTail: PropTypes.string,
        linksLabel: PropTypes.string
    }),
    active: PropTypes.bool
};

MetaMaskAlert.defaultProps = {
    links: {
        metamask: '#',
        chrome: '#',
        firefox: '#',
        opera: '#',
        brave: '#'
    },
    labels: {
        messageStart: 'Please use a',
        messageTail: 'browser plugin to allow direct energy trading from your client!',
        linksLabel: 'MetaMask for '
    },
    active: true
};

export default MetaMaskAlert;
