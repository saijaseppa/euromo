import { useState } from "react";

const PersonForm = ({ searchPerson }) => {

  const [selectedName, setSelectedName] = useState('');

  const handleSubmit = (e, name) => {
    e.preventDefault();
    searchPerson(name);
    setSelectedName('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedName)}>
      <h4>Find all media owned by a person</h4>
      <label>
        Last name of the person:
        <br />
        <input
          type="text"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)} />
      </label>
      <br />
      <input type="submit" value="Search" />
    </form>
  )
}

export default PersonForm;