import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated , component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    (isAuthenticated())
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

export default ProtectedRoute;
