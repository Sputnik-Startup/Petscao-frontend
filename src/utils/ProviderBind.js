import { UserProvider } from '../context/AuthContext';
import { RealTimeAppointmentProvider } from '../context/RealTimeAppointment';
import { ToastProvider } from '../context/ToastContext';

export const ProviderBind = ({ children }) => {
  return (
    <ToastProvider>
      <UserProvider>
        <RealTimeAppointmentProvider>{children}</RealTimeAppointmentProvider>
      </UserProvider>
    </ToastProvider>
  );
};
