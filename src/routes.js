import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import SignIn from './pages/SignIn';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={SignIn} />
      <Route path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
};

export default Routes;
