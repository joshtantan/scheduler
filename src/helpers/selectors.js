export function getAppointmentsForDay(state, day) {
  let appointmentIDs = [];
  const appointments = [];

  const daysState = state.days;
  for (const dayState of daysState) {
    if (dayState.name === day) {
      appointmentIDs = dayState.appointments;
    }
  }

  const appointmentsState = state.appointments;
  for (const appointmentID of appointmentIDs) {
    if(appointmentsState[appointmentID]) {
      appointments.push(appointmentsState[appointmentID]);
    }
  }

  return appointments;
}