import { useMemo, useState } from 'react';

export function useUserSigner(injectedProvider) {
  const [signer, setSigner] = useState();

  useMemo(() => {
    if (injectedProvider) {
      console.log('🦊 Using injected provider');
      const injectedSigner = injectedProvider._isProvider ? injectedProvider.getSigner() : injectedProvider;
      setSigner(injectedSigner);
    }
  }, [injectedProvider]);

  return signer;
}
