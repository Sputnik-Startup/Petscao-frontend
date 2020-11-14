import React from 'react';
import { Route } from 'react-router-dom';
import Appointment from '../Appointment';
import DashboardContent from './dashboardContent';

function DashboardRoute() {
  return (
    <>
      <Route exact path="/dashboard" component={DashboardContent} />
      <Route path="/dashboard/appointments" component={Appointment} />
      <Route path="/dashboard/pets" component={() => <h1>Pets</h1>} />
    </>
  );
}

export default DashboardRoute;
