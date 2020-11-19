import React from 'react';
import { Route } from 'react-router-dom';
import Appointment from '../Appointment';
import Purchase from '../Purchase';
import Customer from '../Customer';
import Pet from '../Pet';
import DashboardContent from './dashboardContent';

function DashboardRoute() {
  return (
    <>
      <Route exact path="/dashboard" component={DashboardContent} />
      <Route path="/dashboard/appointments" component={Appointment} />
      <Route path="/dashboard/purchases" component={Purchase} />
      <Route path="/dashboard/customers" component={Customer} />
      <Route path="/dashboard/pets" component={Pet} />
    </>
  );
}

export default DashboardRoute;
