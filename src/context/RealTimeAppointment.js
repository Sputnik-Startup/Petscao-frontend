const { createContext, useState } = require('react');

export const RealTimeAppointmentContext = createContext({});

export function RealTimeAppointmentProvider({ children }) {
  const [rtAppointment, setRtAppointment] = useState(null);

  return (
    <RealTimeAppointmentContext.Provider
      value={{ rtAppointment, setRtAppointment }}
    >
      {children}
    </RealTimeAppointmentContext.Provider>
  );
}
