/* eslint-disable react/prop-types */
import React from 'react';

import useLookupAddress from '../hooks/useLookupAddress';

// changed value={address} to address={address}

const blockExplorerLink = (address) => `${'https://etherscan.io/'}${'address/'}${address}`;

export default function Address(props) {
  const address = props.value || props.address;

  const ens = useLookupAddress(props.ensProvider, address);

  if (!address) {
    return <></>;
  }

  function truncateAddress(addr) {
    const prefix = addr.substring(0, 6);
    const suffix = addr.substring(addr.length - 4);
    return prefix + '...' + suffix;
  }

  let displayAddress = address.substr(0, 6);

  if (ens && ens.indexOf('0x') < 0) {
    displayAddress = ens;
  } else {
    displayAddress = truncateAddress(address);
  }

  const etherscanLink = blockExplorerLink(address, props.blockExplorer);

  let text;
  if (props.onChange) {
    text = (
      <a target="_blank" style={{ color: '#fff' }} href={etherscanLink} rel="noopener noreferrer">
        {displayAddress}
      </a>
    );
  } else {
    text = (
      <a target="_blank" style={{ color: '#fff' }} href={etherscanLink} rel="noopener noreferrer">
        {displayAddress}
      </a>
    );
  }

  return (
    <span>
      <span className="text-white" style={{ color: '#fff' }}>
        {text}
      </span>
    </span>
  );
}
