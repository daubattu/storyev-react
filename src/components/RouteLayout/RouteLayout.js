import React from 'react';
import { Route } from 'react-router-dom';

export default ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )}/>
)