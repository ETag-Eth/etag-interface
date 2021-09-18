import React from 'react';

import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import Address from './Address';

Account.propTypes = {
  address: PropTypes.string.isRequired,
  mainnetProvider: PropTypes.object.isRequired
};

export default function Account({ address, mainnetProvider }) {
  return (
    <Button variant="" className="btn btn-bordered-white mr-2">
      <span className="text-white">{address ? <Address address={address} ensProvider={mainnetProvider} /> : ''}</span>
    </Button>
  );
}
