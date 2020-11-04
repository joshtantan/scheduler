import { useState, useEffect } from "react";
import axios from "axios";

const daysURL = "/api/days";
const appointmentsURL = "/api/appointments";
const interviewersURL = "/api/interviewers";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    let dayID;

    if (id >= 1 && id <= 5) {
      dayID = 0;
    } else if (id >= 6 && id <= 10) {
      dayID = 1;
    } else if (id >= 11 && id <= 15) {
      dayID = 2;
    } else if (id >= 16 && id <= 20) {
      dayID = 3;
    } else if (id >= 21 && id <= 25) {
      dayID = 4;
    }

    let day = { ...state.days[dayID] };
    day.spots--;

    const days = [...state.days];
    days[dayID] = day;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
      });
  };

  const cancelInterview = id => {
    let dayID;

    if (id >= 1 && id <= 5) {
      dayID = 0;
    } else if (id >= 6 && id <= 10) {
      dayID = 1;
    } else if (id >= 11 && id <= 15) {
      dayID = 2;
    } else if (id >= 16 && id <= 20) {
      dayID = 3;
    } else if (id >= 21 && id <= 25) {
      dayID = 4;
    }

    let day = { ...state.days[dayID] };
    day.spots++;

    const days = [...state.days];
    days[dayID] = day;

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }));
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