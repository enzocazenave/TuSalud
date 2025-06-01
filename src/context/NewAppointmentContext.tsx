import { createContext, useContext } from "react";

type NewAppointmentContextType = {
}

const NewAppointmentContext = createContext<NewAppointmentContextType | null>(null);

export const useNewAppointment = () => {
  const context = useContext(NewAppointmentContext);

  if (!context) {
    throw new Error('useNewAppointment must be used within a NewAppointmentProvider');
  }
  
  return context;
}

export const NewAppointmentProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NewAppointmentContext.Provider value={{}}>
      {children}
    </NewAppointmentContext.Provider>
  )
}