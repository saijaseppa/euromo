import { useState } from "react";

const PersonOutletForm = ({ searchPersonOutlet }) => {

  const [selectedName, setSelectedName] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');

  const handleSubmit = (e, name, outlet) => {
    e.preventDefault();
    searchPersonOutlet(name, outlet);
    setSelectedName('');
    setSelectedOutlet('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedName, selectedOutlet)}>
      <h4>Find relationships between person and outlet</h4>
      <label>
        Last name of the person:
        <br />
        <input
          type="text"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)} />
      </label>
      <br />
      <label>
        Name of the outlet:
        <br />
        <input
          type="text"
          value={selectedOutlet}
          onChange={(e) => setSelectedOutlet(e.target.value)} />
      </label>
      <br />
      <input type="submit" value="Search" />
    </form>
  )
}

export default PersonOutletForm;