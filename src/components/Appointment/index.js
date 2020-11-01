import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } = props;
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(transition(SHOW))
      .catch(err => {
        console.error(err);
      });
  };

  const removePending = () => {
    transition(CONFIRM);
  }

  const removeConfirmed = () => {
    transition(DELETING);

    cancelInterview(id)
      .then(transition(EMPTY))
      .catch(err => {
        console.error(err);
      });
  };

  const interviewerName = id => {
    for (const interviewer of interviewers) {
      if (interviewer.id === id) {
        return interviewer.name;
      }
    }
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && (
        <Empty 
          onAdd={() => transition(CREATE)} 
        />
      )}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interviewerName(interview.interviewer)}
          onDelete={removePending}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message="Saving"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this?"
          onCancel={() => back()}
          onConfirm={removeConfirmed}
        />
      )}
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
    </ article>
  );
}