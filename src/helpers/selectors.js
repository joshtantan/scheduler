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
  const dayItem = state.days.find(dayEntry => dayEntry.name === day);
  if (!dayItem) {
    return [];
  }
  return dayItem.interviewers.map(interviewerID => state.interviewers[interviewerID]);
}

function getInterview(state, interview) {
  if (!interview) return null;

  const interviewerID = interview.interviewer;
  const student = interview.student;
  const interviewersState = state.interviewers;
  let interviewResult = { student };

  for (const interviewerState in interviewersState) {
    if (interviewersState[interviewerState].id === interviewerID) {
      interviewResult["interviewer"] = interviewersState[interviewerState];
      return interviewResult;
    }
  }

  return null;
}

module.exports = { getAppointmentsForDay, getInterviewersForDay, getInterview };
