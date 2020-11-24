import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import SignIn from './pages/SignIn';
import PrivateRoute from './utils/PrivateRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SignIn} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
};

export default Routes;
