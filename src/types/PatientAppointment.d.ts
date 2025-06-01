export type PatientAppointment = {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  specialty: {
    name: string;
  };
  professional: {
    full_name: string;
    email: string;
    phone_number: number;
  };
}