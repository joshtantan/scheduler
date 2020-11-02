import React from "react";

import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
      .then(() => {
        transition(SHOW);
      })
      .catch(err => {
        console.error(err);
        transition(ERROR_SAVE, true);
      });
  };

  const removePending = () => {
    transition(CONFIRM);
  }

  const removeConfirmed = () => {
    transition(DELETING, true);

    cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        console.error(err);
        transition(ERROR_DELETE, true);
      });
  };

  const edit = () => {
    transition(EDIT);
  }

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
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer}
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
      {mode === DELETING && (
        <Status
          message="Deleting"
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete this?"
          onCancel={() => back()}
          onConfirm={removeConfirmed}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save the appointment"
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete the appointment"
          onClose={() => back()}
        />
      )}
    </ article>
  );
}