import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';

const Routes = () => {
  return (
    <BrowserRouter>
        <Route exact path="/" component={SignIn} />
        <Route path="/user" component={()=> <h3>teste</h3>} />
    </BrowserRouter>
  );
};

export default Routes;