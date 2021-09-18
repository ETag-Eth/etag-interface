import React from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

import StyleGrid from '../components/StyleGrid';

export default function StyleSelector() {
  return (
    <>
      <section className="section welcome-area d-flex align-items-center h-100vh pt-0">
        <Container>
          <Row>
            <Col>
              <div className="section-heading text-center">
                <h2 className="text-white text-capitalize">Choose a template</h2>
                <p className="d-none d-sm-block mt-4 text-white"></p>
              </div>
            </Col>
          </Row>

          {/* Tag style grid */}
          <StyleGrid />

          <Row>
            <Col>
              <div className="button-group text-center">
                <Link to="/" className="btn btn-bordered-white">
                  Back
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
