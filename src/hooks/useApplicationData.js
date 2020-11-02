import { useState, useEffect } from "react";
import axios from "axios";

const daysURL = "http://localhost:8001/api/days";
const appointmentsURL = "http://localhost:8001/api/appointments";
const interviewersURL = "http://localhost:8001/api/interviewers";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(() => {
        setState(prev => ({ ...prev, appointments }));
      });
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({ ...prev, appointments }));
      });
  };

  useEffect(() => {
    const daysPromise = axios.get(daysURL);
    const appointmentsPromise = axios.get(appointmentsURL);
    const interviewersPromise = axios.get(interviewersURL);

    Promise.all([daysPromise, appointmentsPromise, interviewersPromise])
      .then(([res1, res2, res3]) => {
        const days = res1.data;
        const appointments = res2.data;
        const interviewers = res3.data;
        
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}