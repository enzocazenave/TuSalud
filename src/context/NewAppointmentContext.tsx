import { createContext, useContext, useState } from "react";

type NewAppointmentContextType = {
  prepaidAffiliation: any;
  setPrepaidAffiliation: (prepaidAffiliation: any) => void;
  specialty: any;
  setSpecialty: (specialty: any) => void;
  professional: any;
  setProfessional: (professional: any) => void;
  slot: any;
  setSlot: (slot: any) => void;
  resetNewAppointment: () => void;
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
  const [prepaidAffiliation, setPrepaidAffiliation] = useState({})
  const [specialty, setSpecialty] = useState({})
  const [professional, setProfessional] = useState({})
  const [slot, setSlot] = useState({})

  const resetNewAppointment = () => {
    setPrepaidAffiliation({})
    setSpecialty({})
    setProfessional({})
    setSlot({})
  }

  return (
    <NewAppointmentContext.Provider value={{
      prepaidAffiliation,
      setPrepaidAffiliation,
      specialty,
      setSpecialty,
      professional,
      setProfessional,
      slot,
      setSlot,
      resetNewAppointment
    }}>
      {children}
    </NewAppointmentContext.Provider>
  )
}