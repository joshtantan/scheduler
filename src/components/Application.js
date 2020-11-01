import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";

const daysURL = "http://localhost:8001/api/days";
const appointmentsURL = "http://localhost:8001/api/appointments";
const interviewersURL = "http://localhost:8001/api/interviewers";

export default function Application(props) {
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
      .then(setState(prev => ({ ...prev, appointments })))
      .catch(err => {
        console.error(err);
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
      .then(setState(prev => ({ ...prev, appointments })))
      .catch(err => {
        console.error(err);
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

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);

    return (
    <Appointment 
      key={appointment.id} 
      id={appointment.id} 
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      {...appointment}
    />);
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
