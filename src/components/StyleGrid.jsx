import React from 'react';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StylePreview = styled.div`
  &:hover > .overlay {
    width: 92%;
    height: 100%;
    position: absolute;
    background-color: #000;
    opacity: 0.5;
    cursor: pointer;
    transition: 0.5s ease-in-out;
  }
`;

export default function StyleGrid() {
  return (
    <Row>
      <Col>
        {/* <StylePreview>
          
          <a href="/editor" className="">
            <Image src="/img/demo-3.jpg" thumbnail />
          </a>
        </StylePreview> */}
      </Col>

      <Col>
        <StylePreview>
          <Link to="/editor" className="thumbnail">
            <Image src="/img/demo-frosty.jpg" thumbnail />
          </Link>
          <span className="d-none d-sm-block mt-4 text-white text-center">
            Frosty <br />
            By{' '}
            <a className="text-white" target="_blank" href="http://bayological.eth.link/" rel="noreferrer">
              Bayological.eth
            </a>
          </span>
        </StylePreview>
      </Col>

      <Col>
        {/* <StylePreview>
           
          <a href="/editor" className="thumbnail">
            <Image src="/img/demo-5.jpg" thumbnail />
          </a>
        </StylePreview> */}
      </Col>
    </Row>
  );
}
