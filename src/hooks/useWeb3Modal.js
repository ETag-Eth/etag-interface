import { useCallback, useEffect, useState } from 'react';

import { setupENS } from '@ensdomains/ui';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useHistory } from 'react-router-dom';
import Web3Modal from 'web3modal';

const INFURA_ID = process.env.REACT_APP_INFURA_KEY;
const NETWORK_NAME = 'mainnet';

function getSigner(injectedProvider) {
  if (injectedProvider) {
    const injectedSigner = injectedProvider._isProvider ? injectedProvider.getSigner() : injectedProvider;
    return injectedSigner;
  }
}

function useWeb3Modal(config = {}) {
  const [injectedProvider, setInjectedProvider] = useState();
  const [autoLoaded, setAutoLoaded] = useState(false);
  const [signedInAddress, setSignedInAddress] = useState('');
  const [ensName, setEnsName] = useState('');
  const history = useHistory();

  const { autoLoad = true, infuraId = INFURA_ID, NETWORK = NETWORK_NAME } = config;

  const web3Modal = new Web3Modal({
    network: NETWORK,
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId
        }
      }
    }
  });

  const getEnsName = async () => {
    const { ens } = await setupENS();
    const name = await ens.getName(signedInAddress);
    setEnsName(name.name);
  };

  // Load Modal Callback
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
    setSignedInAddress(provider.selectedAddress);
    await getEnsName();

    provider.on('chainChanged', (chainId) => {
      console.log(`chain changed to ${chainId}! updating providers`);
      setInjectedProvider(new Web3Provider(provider));
      setSignedInAddress(provider.selectedAddress);
      console.log(history);
    });

    provider.on('accountsChanged', () => {
      console.log(`account changed!`);
      setInjectedProvider(new Web3Provider(provider));
      setSignedInAddress(provider.selectedAddress);
    });

    // Subscribe to session disconnection
    provider.on('disconnect', (code, reason) => {
      console.log(code, reason);
      logoutOfWeb3Modal();
    });
  }, [setInjectedProvider]);

  // Logout Modal Callback
  const logoutOfWeb3Modal = useCallback(
    async function () {
      setSignedInAddress('');
      if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect === 'function') {
        await injectedProvider.provider.disconnect();
      }
      await web3Modal.clearCachedProvider();
      window.location.reload();
    },
    [web3Modal]
  );

  // Set Address
  useEffect(() => {
    async function getAddress() {
      const userSigner = getSigner(injectedProvider);

      try {
        if (userSigner) {
          const newAddress = await userSigner.getAddress();
          setSignedInAddress(newAddress);
          await getEnsName();
        }
      } catch (error) {
        console.log('An error occurred while trying to get ens name', error);
        setSignedInAddress('');
      }
    }
    getAddress();
  });

  // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
  useEffect(() => {
    if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
      loadWeb3Modal();
      setAutoLoaded(true);
    }
  }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

  return [injectedProvider, loadWeb3Modal, logoutOfWeb3Modal, signedInAddress, ensName, web3Modal];
}

export default useWeb3Modal;
