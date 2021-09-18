import React from 'react';

// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Typed from 'react-typed';

// import useWeb3Modal from '../hooks/useWeb3Modal';
// import WalletButton from './WalletButton';

export default function Hero() {
  // const [injectedProvider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();

  return (
    <section id="home" className="section welcome-area d-flex align-items-center h-100vh pt-0">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12 col-md-7 col-lg-6">
            <div className="welcome-intro text-center mt-0">
              <h1 className="text-white glowy-text">
                Etag.eth
                <span className="badge badge-pill badge-light fw-4">v1.0</span>
              </h1>
              <h2 className="cd-headline clip fw-3 mt-2 mt-sm-3">
                <span className="text-white mr-2">
                  Your{' '}
                  <Typed
                    strings={['Space']}
                    // strings={['Space', 'Social Profile', 'ID Card', 'POAP Pin Board', 'Alias', 'NFT Showcase']}
                    typeSpeed={40}
                  />
                  <br /> on the decentralized web
                </span>
              </h2>
              <p className="text-white my-3">
                An ETag is your unique space on the decentralised web that you can create for your friends and other
                people to identify you in the Metaverse. Your ETag is connected to your ENS name and is deployed to
                IPFS.
              </p>

              <div className="button-group">
                <Link to="/selector" className="btn btn-bordered-white">
                  {' '}
                  Launch DAPP{' '}
                </Link>
                {/* {!injectedProvider ? (
                  <Button
                    variant=""
                    className="btn btn-bordered-white"
                    onClick={() => {
                      if (!injectedProvider) {
                        loadWeb3Modal();
                      } else {
                        logoutOfWeb3Modal();
                      }
                    }}>
                    {!injectedProvider ? 'Connect Wallet' : `Disconnect Wallet`}
                  </Button>
                ) : (
                  <Link to="/selector" className="btn btn-bordered-white">
                    {' '}
                    Launch DAPP{' '}
                  </Link>
                )} */}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-5 col-lg-6 pt-4 pt-md-0">
            <div className="welcome-thumb text-center">
              <img src="/img/card2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="shapes-container">
        <div className="wave-animation">
          {/* Wave Animation */}
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x={48} y={0} fill="rgba(255,255,255,0.7" />
              <use xlinkHref="#gentle-wave" x={48} y={3} fill="rgba(255,255,255,0.5)" />
              <use xlinkHref="#gentle-wave" x={48} y={5} fill="rgba(255,255,255,0.3)" />
              <use xlinkHref="#gentle-wave" x={48} y={7} fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
