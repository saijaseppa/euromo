import { useState } from "react";

const OutletForm = ({ searchOutlet }) => {

  const [selectedOutlet, setSelectedOutlet] = useState('');

  const handleSubmit = (e, outlet) => {
    e.preventDefault();
    searchOutlet(outlet);
    setSelectedOutlet('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedOutlet)}>
      <h4>Find all owners of the outlet</h4>
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

export default OutletForm;