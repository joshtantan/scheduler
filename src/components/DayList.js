import React from 'react';
// import classNames from 'classnames';

import DayListItem from 'components/DayListItem'

export default function DayList(props) {
  const { days, day, setDay } = props;

  const daylistItems = days.map(eachDay => (
    <DayListItem 
      name={eachDay.name} 
      spots={eachDay.spots} 
      selected={eachDay.name === day}
      setDay={setDay}
    />
  ))

  return (
    <ul>
      {daylistItems}
    </ul>
  );
}