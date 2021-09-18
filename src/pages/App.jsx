import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Success from '../components/Success';
import Landing from '../pages/Landing';
import StyleSelector from '../pages/StyleSelector';
import TagEditor from '../pages/TagEditor';

require('dotenv').config();

export default function App() {
  return (
    <div className="italy">
      <div className="all-area">
        <NavBar />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/selector" component={StyleSelector} />
          <Route exact path="/editor" component={TagEditor} />
          <Route exact path="/success" component={Success} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}
