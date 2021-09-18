import React, { useEffect, useState, useCallback } from 'react';

import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

import { useUserSigner } from '../hooks/useUserSigner';
import Account from './Account';
import WalletButton from './WalletButton';

const INFURA_ID = '45b9c19afc0c40ba9a127b6b0aa2bebf';
const NETWORK_NAME = 'mainnet';

const web3Modal = new Web3Modal({
  network: NETWORK_NAME,
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        INFURA_ID
      }
    }
  }
});

export default function NavBar() {
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState();

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect === 'function') {
      await injectedProvider.provider.disconnect();
    }
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));

    provider.on('chainChanged', (chainId) => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new Web3Provider(provider));

      console.log(history);
    });

    provider.on('accountsChanged', () => {
      console.log(`account changed!`);
      setInjectedProvider(new Web3Provider(provider));
    });

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const userSigner = useUserSigner(injectedProvider);

  useEffect(() => {
    async function getAddress() {
      if (userSigner) {
        let newAddress = '';
        try {
          newAddress = await userSigner.getAddress();
        } catch (error) {
          console.log('An error occurred trying to load the users address', error);
        }
        setAddress(newAddress);
      }
    }
    getAddress();
  }, [userSigner]);

  return (
    <header className="section header-area">
      <div id="appo-header" className="main-header-area nav-white">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md navbar-light">
            {/* Logo */}
            <a className="navbar-brand" href="/">
              <img className="logo" src="/img/logo-light.png" alt="" />
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#appo-menu">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="appo-menu">
              {/* Header Items */}

              <ul className="navbar-nav header-items ml-auto">
                <li className="nav-item active">
                  {address ? (
                    <Account
                      address={address}
                      mainnetProvider={injectedProvider}
                      web3Modal={web3Modal}
                      loadWeb3Modal={loadWeb3Modal}
                      logoutOfWeb3Modal={logoutOfWeb3Modal}
                    />
                  ) : (
                    ''
                  )}

                  <WalletButton
                    address={address}
                    mainnetProvider={injectedProvider}
                    web3Modal={web3Modal}
                    loadWeb3Modal={loadWeb3Modal}
                    logoutOfWeb3Modal={logoutOfWeb3Modal}
                  />
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
