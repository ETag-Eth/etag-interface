import React, { useEffect, useState } from 'react';

import { setupENS } from '@ensdomains/ui';
import detectEthereumProvider from '@metamask/detect-provider';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

TagInfoForm.propTypes = {
  setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired
};

export default function TagInfoForm({ setFormData, handleSubmit, loading, setLoading, formData }) {
  const showSpinner = () => setLoading(true);
  const [txtEmail, setTxtEmail] = useState();
  const [txtDesc, setTxtDesc] = useState();
  const [txtTwitter, setTxtTwitter] = useState();
  const [txtInstagram, setTxtInstagram] = useState();

  useEffect(() => {
    async function preLoadEnsData() {
      const { ens } = await setupENS();

      const provider = await detectEthereumProvider();
      if (!provider) return;

      const getNameResult = await ens.getName(provider.selectedAddress);
      if (!getNameResult) return;

      const ensEmail = await ens.getText(getNameResult.name, 'email');
      const ensDesc = await ens.getText(getNameResult.name, 'description');
      const ensTwitter = await ens.getText(getNameResult.name, 'com.twitter');
      const ensInstagram = await ens.getText(getNameResult.name, 'com.instagram');

      setTxtEmail(ensEmail);
      setTxtDesc(ensDesc);
      setTxtTwitter(ensTwitter);
      setTxtInstagram(ensInstagram);
    }
    preLoadEnsData();
  });

  return (
    <div className="appo-modal  ">
      <div className="modal-content">
        <div>
          <div className="modal-body">
            <div className="tab-pane fade show active" id="signup">
              <form onSubmit={handleSubmit} className="login-form signup-form">
                {/* Description Input */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="desc">
                      {' '}
                      <i className="fas fa-align-justify" />{' '}
                    </span>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Profile Description"
                    aria-label="desc"
                    aria-describedby="desc"
                    name="desc"
                    onChange={setFormData}
                    value={txtDesc}
                  />
                </div>

                {/* Email Input */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon4">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon4"
                    name="email"
                    onChange={setFormData}
                    value={txtEmail}
                  />
                </div>

                {/* Twitter Input */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon4">
                      <i className="fab fa-twitter" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Twitter"
                    aria-label="Twitter"
                    aria-describedby="basic-addon4"
                    name="twitter"
                    onChange={setFormData}
                    value={txtTwitter}
                  />
                </div>

                {/* Insta Input */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon4">
                      <i className="fab fa-instagram" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Instagram"
                    aria-label="Instagram"
                    aria-describedby="basic-addon4"
                    name="instagram"
                    value={txtInstagram}
                    onChange={setFormData}
                  />
                </div>

                {/* Publish Button */}
                <button type="submit" className="btn btn-bordered d-block container" onClick={showSpinner}>
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="visually-hidden">&nbsp;</span>
                    </>
                  ) : (
                    'Publish'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
