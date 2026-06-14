import React from 'react';

const PeopleList = () => {
  const people = ['Alice', 'Bob', 'Charlie'];

  const peopleList = people.map((person, index) => (
    <li key={index}>{person}</li>
  ));

  return (
    <div>
      <h1>List of People:</h1>
      <ul>{peopleList}</ul>
    </div>
  );
};

export default PeopleList;
