function getAppointmentsForDay(state, day) {
  let appointmentIDs = [];

  const daysState = state.days;
  for (const dayState of daysState) {
    if (dayState.name === day) {
      appointmentIDs = dayState.appointments;
    }
  }

  const appointmentsState = state.appointments;
  return appointmentIDs.map(id => appointmentsState[id]);
}

function getInterviewersForDay(state, day) {
  const interviewers = [];
  const appointments = getAppointmentsForDay(state, day);
  
  for (const appointment of appointments) {
    let interviewerID;

    if (appointment.interview) {
      interviewerID = appointment.interview.interviewer;

      if (!interviewers.includes(interviewerID)) {
        interviewers.push(interviewerID);
      }
    }
  }

  const interviewersState = state.interviewers;
  return interviewers.map(id => {
    if (interviewersState[id]) {
      return interviewersState[id];
    } else {
      return undefined;
    }
  });
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

module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview };
