import React from 'react';
import { Route } from 'react-router-dom';
import Appointment from '../Appointment';
import Purchase from '../Purchase';
import Customer from '../Customer';
import Pet from '../Pet';
import Employee from '../Employee';
import Post from '../Post';
import DashboardContent from './dashboardContent';
import Tools from '../Tools';

function DashboardRoute() {
  return (
    <>
      <Route exact path="/dashboard" component={DashboardContent} />
      <Route path="/dashboard/appointments" component={Appointment} />
      <Route path="/dashboard/purchases" component={Purchase} />
      <Route path="/dashboard/customers" component={Customer} />
      <Route path="/dashboard/employees" component={Employee} />
      <Route path="/dashboard/posts" component={Post} />
      <Route path="/dashboard/pets" component={Pet} />
      <Route path="/dashboard/tools" component={Tools} />
    </>
  );
}

export default DashboardRoute;
