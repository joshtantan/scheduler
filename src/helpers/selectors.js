function getAppointmentsForDay(state, day) {
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
    if (appointmentsState[appointmentID]) {
      appointments.push(appointmentsState[appointmentID]);
    }
  }

  return appointments;
}

function getInterview(state, interview) {
  if (!interview) return null;

  const interviewerID = interview.interviewer;
  const student = interview.student;
  const interviewersState = state.interviewers;
  let interviewResult = {student};
  
  for (const interviewerState in interviewersState) {
    if (interviewersState[interviewerState].id === interviewerID) {
      interviewResult["interviewer"] = interviewersState[interviewerState];
      return interviewResult;
    }
  }

  return null;
}

module.exports = { getAppointmentsForDay, getInterview };
