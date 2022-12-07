import { useState } from "react";

const OutletLegalOwnerForm = ({ searchOutletLegal_owner }) => {

  const [selectedLegal_owner, setSelectedLegal_owner] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState('');

  const handleSubmit = (e, legal_owner, outlet) => {
    e.preventDefault();
    searchOutletLegal_owner(legal_owner, outlet);
    // setting initial states to variables
    setSelectedLegal_owner('');
    setSelectedOutlet('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedLegal_owner, selectedOutlet)}>
      <h4>Find relationships between legal owner and outlet</h4>
      <label>
        Last name of the legal owner:
        <br />
        <input
          type="text"
          value={selectedLegal_owner}
          onChange={(e) => setSelectedLegal_owner(e.target.value)} />
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

export default OutletLegalOwnerForm;