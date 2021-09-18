import React from 'react';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

WalletButton.propTypes = {
  web3Modal: PropTypes.object.isRequired,
  loadWeb3Modal: PropTypes.func.isRequired,
  logoutOfWeb3Modal: PropTypes.func.isRequired
};

export default function WalletButton({ web3Modal, loadWeb3Modal, logoutOfWeb3Modal }) {
  const modalButtons = [];

  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <Button key="logoutbutton" variant="" className="btn btn-bordered-white" onClick={logoutOfWeb3Modal}>
          Disconnect Wallet
        </Button>
      );
    } else {
      modalButtons.push(
        <Button key="loginbutton" variant="" className="btn btn-bordered-white" onClick={loadWeb3Modal}>
          Connect Wallet
        </Button>
      );
    }
  }
  return <>{modalButtons}</>;
}
