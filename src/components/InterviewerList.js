import React from 'react';

import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem'

export default function DayList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const interviewerListItems = interviewers.map((eachInterviewer, index) => (
    <InterviewerListItem
      key={index}
      name={eachInterviewer.name}
      avatar={eachInterviewer.avatar}
      selected={eachInterviewer.id === interviewer}
      setInterviewer={setInterviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  );
}