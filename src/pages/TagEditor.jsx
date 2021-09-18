import React, { useReducer, useState, useEffect } from 'react';

import { setupENS, namehash } from '@ensdomains/ui';
import { Web3Provider } from '@ethersproject/providers';
import fleekStorage from '@fleekhq/fleek-storage-js';
import detectEthereumProvider from '@metamask/detect-provider';
import contentHash from 'content-hash';
import { utils, Contract, ethers } from 'ethers';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link, useHistory } from 'react-router-dom';

import TagInfoForm from '../components/TagInfoForm';

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value
  };
};

async function getEnsName(provider, address) {
  if (address && utils.isAddress(address)) {
    console.log(`looking up ${address}`);
    try {
      const reportedName = await provider.lookupAddress(address);

      const resolvedAddress = await provider.resolveName(reportedName);

      if (address && utils.getAddress(address) === utils.getAddress(resolvedAddress)) {
        return reportedName;
      }
      return utils.getAddress(address);
    } catch (e) {
      return utils.getAddress(address);
    }
  }
  return 0;
}

async function getUpdatedTempalate(formData, avatarHash, name) {
  let template = await (await fetch('templates/etag-frosty.html')).text();
  template = template
    .replace('[[TAG.DESC]]', formData.desc)
    .replace('[[TAG.EMAIL]]', formData.email)
    .replace('[[TAG.TWITTER]]', formData.twitter)
    .replace('[[TAG.INSTA]]', formData.instagram)
    .replace('[[TAG.NAME]]', name)
    .replace('[[TAG.NAME]]', name)
    .replace('[[TAG.AVATAR]]', avatarHash);
  return template;
}

async function uploadAvatar(ensName, image) {
  const uploadedAvatar = await fleekStorage.upload({
    apiKey: process.env.REACT_APP_FLEEK_KEY,
    apiSecret: process.env.REACT_APP_FLEEK_SECRET,
    key: ensName + `.avatar.` + image.raw.type.split('/')[1],
    data: image.raw
  });

  console.log('Avatar Hash' + uploadedAvatar.hash);

  return uploadedAvatar.hash;
}

async function uploadTagToIpfs(ensName, updatedTemplate) {
  const uploadInfo = await fleekStorage.upload({
    apiKey: process.env.REACT_APP_FLEEK_KEY,
    apiSecret: process.env.REACT_APP_FLEEK_SECRET,
    key: ensName,
    data: updatedTemplate
  });

  console.log('Content Hash' + uploadInfo.hash);

  return uploadInfo;
}

async function updateInfo(provider, formData, signedInAddress, image) {
  //
  const name = await getEnsName(provider, signedInAddress);
  const avatarHash = await uploadAvatar(name, image);
  const eTagHtml = await getUpdatedTempalate(formData, avatarHash, name);
  const uploadedFile = await uploadTagToIpfs(name, eTagHtml);

  const { ens } = await setupENS();

  const encodedContentHash = '0x' + contentHash.encode('ipfs-ns', uploadedFile.hashV0);
  const nameHash = namehash(name);

  console.log(encodedContentHash);
  console.log(nameHash);
  console.log(uploadedFile);

  const resolverAbi = [
    'function multicall(bytes[] calldata data)',
    'function setText(bytes32 node, string calldata key, string calldata value)',
    'function setContenthash(bytes32 node, bytes calldata hash)'
  ];

  const signer = provider.getSigner();

  //  Get resolver contract
  const resolverAddress = await ens.getResolver(name);
  console.log(`Resolver for ${name} - ${resolverAddress}`);

  const resolver = new Contract(resolverAddress, resolverAbi, signer);
  const resolverInterface = new ethers.utils.Interface(resolverAbi);

  const setEmail = await resolverInterface.encodeFunctionData(
    'setText(bytes32 node, string calldata key, string calldata value)',
    [nameHash, 'email', `${formData.email}`]
  );

  const setTwitter = await resolverInterface.encodeFunctionData(
    'setText(bytes32 node, string calldata key, string calldata value)',
    [nameHash, 'com.twitter', `${formData.twitter}`]
  );

  const setAlias = await resolverInterface.encodeFunctionData(
    'setText(bytes32 node, string calldata key, string calldata value)',
    [nameHash, 'description', `${formData.desc}`]
  );

  const setAvatar = await resolverInterface.encodeFunctionData(
    'setText(bytes32 node, string calldata key, string calldata value)',
    [nameHash, 'avatar', `https://${avatarHash}.ipfs.dweb.link/`]
  );

  const setInsta = await resolverInterface.encodeFunctionData(
    'setText(bytes32 node, string calldata key, string calldata value)',
    [nameHash, 'com.instagram', `${formData.instagram}`]
  );

  const setContentTx = await resolverInterface.encodeFunctionData('setContenthash(bytes32 node, bytes calldata hash)', [
    nameHash,
    encodedContentHash
  ]);

  try {
    const multicallResult = await resolver.multicall(
      [setEmail, setTwitter, setAlias, setContentTx, setAvatar, setInsta],
      {
        from: signedInAddress
      }
    );

    console.log('ENS multicall tx ', multicallResult);
    console.log('ENS new content hash ' + uploadedFile.hashV0);

    return true;
  } catch (error) {
    console.log('Send resolver multicall transaction failed', error);
    return false;
  }
}

export default function TagEditor() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [image, setImage] = useState({ preview: '', raw: '' });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Get avatar link
  useEffect(() => {
    async function preLoadEnsData() {
      const { ens } = await setupENS();

      const provider = await detectEthereumProvider();
      if (!provider) return;

      const getNameResult = await ens.getName(provider.selectedAddress);
      if (!getNameResult) return;

      const ensAvatar = await ens.getText(getNameResult.name, 'avatar');
      setImage({ preview: ensAvatar, raw: '' });
    }
    preLoadEnsData();
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (image.raw) {
      detectEthereumProvider().then(function (detectedProvider) {
        try {
          updateInfo(new Web3Provider(detectedProvider), formData, detectedProvider.selectedAddress, image)
            .then(function (result) {
              setLoading(false);
            })
            .then(function (result) {
              history.push('/success');
            });
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      });
    } else {
      alert('You must upload an avatar');
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  return (
    <>
      <section className="section welcome-area d-flex align-items-center h-100vh pt-0">
        <Container>
          <Row>
            <Col>
              <div className="section-heading text-center">
                <h2 className="text-white text-capitalize">Customize Your Etag</h2>
                <p className="d-none d-sm-block mt-4 text-white">
                  Information you enter here will be saved to your ENS name and will <br /> appear on your Etag once it
                  has been published.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="col-12 col-md-6 col-lg-5">
              <TagInfoForm
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                loading={loading}
                setLoading={setLoading}
                formData={formData}
              />
            </Col>

            <Col className="col-12 col-md-6 col-lg-5" style={{ left: '15%' }}>
              <div className="card-wrap">
                <figure className="card" data-tilt>
                  <div className="card-content">
                    <input id="upload-button" type="file" style={{ display: 'none' }} onChange={handleImageChange} />
                    <label htmlFor="upload-button">
                      {image.preview ? (
                        <img src={image.preview} className="img-bg" alt="image preview" />
                      ) : (
                        <img src="/img/upload.png" className="img-bg" alt="" />
                      )}
                    </label>

                    <figcaption>
                      <h3>{formData.name}</h3>
                      <p>{formData.desc}</p>
                      <p>{formData.email}</p>
                      <p>{formData.twitter ? `@${formData.twitter}` : ''}</p>
                      <p>{formData.instagram ? `@${formData.instagram}` : ''}</p>
                    </figcaption>
                  </div>
                </figure>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="button-group text-center">
                <Link to="/selector" className="btn btn-bordered-white">
                  {' '}
                  Back{' '}
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
