import React from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <section className="section welcome-area d-flex align-items-center h-100vh pt-0">
      <Container>
        <div className="thanks-area">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-5 mx-auto mb-5 pt-4 text-center">
                <img style={{ maxWidth: '50%' }} src="/img/success.png" alt="" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-10 col-lg-8 mx-auto text-center mb-5 text-white">
                <h2 className="text-white">Congrats!</h2>
                <p className="my-3 text-white">
                  You&apos;ve successfully created an etag, you&apos;re in a league of your own. Now you can flex your
                  .eth name!
                </p>
                <div className="button-group text-center">
                  <Link to="/" className="btn btn-bordered-white">
                    Back Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
