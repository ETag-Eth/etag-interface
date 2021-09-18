import React from 'react';

export default function Footer() {
  return (
    <footer className="section footer-area footer-bg">
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Copyright Area */}
              <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                <div className="copyright-left text-black-50">
                  <div className="social-icons d-flex">
                    <a className="twitter" href="https://twitter.com/EtagEth" target="_blank" rel="noreferrer">
                      <i className="fab fa-twitter" />
                      <i className="fab fa-twitter" />
                    </a>
                    <a className="discord" href="https://discord.gg/pteS8e29gK" target="_blank" rel="noreferrer">
                      <i className="fab fa-discord" />
                      <i className="fab fa-discord" />
                    </a>
                    <a className="ethereum" href="https://etag.eth.link/" target="_blank" rel="noreferrer">
                      <i className="fab fa-ethereum" />
                      <i className="fab fa-ethereum" />
                    </a>
                  </div>
                </div>

                {/* Copyright Right */}
                <div className="copyright-right text-black-50">
                  Made with ❤️By{' '}
                  <a
                    className="text-black"
                    href="https://bayological-eth.ipns.dweb.link/#/"
                    target="_blank"
                    rel="noreferrer">
                    Bayological
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
