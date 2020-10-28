import React from 'react';

import DayListItem from 'components/DayListItem'

export default function DayList(props) {
  const { days, day, setDay } = props;

  const daylistItems = days.map((eachDay, index) => (
    <DayListItem 
      key={index}
      name={eachDay.name} 
      spots={eachDay.spots} 
      selected={eachDay.name === day}
      setDay={() => setDay(eachDay.name)}
    />
  ));

  return (
    <ul>
      {daylistItems}
    </ul>
  );
}