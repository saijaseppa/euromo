import { useState } from "react";
import RadioButton from "../RadioButton";

const Legal_ownerForm = ({ searchLegalOwner }) => {

  const [selectedLegal_owner, setSelectedLegal_owner] = useState('');
  const [searchType, setSearchType] = useState("single");

  const handleSubmit = (e, legal_owner) => {
    e.preventDefault();
    searchLegalOwner(legal_owner, searchType);
    // setting initial states to variables
    setSelectedLegal_owner('');
    setSearchType("single")
  }

  const handleSingleChange = () => {
    setSearchType("single");
  }
  const handleImmediateChange = () => {
    setSearchType("immediate");
  }
  const handleAllChange = () => {
    setSearchType("all");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedLegal_owner)}>
      <h4>Find by the legal owner</h4>
      <label>
        Name of the legal owner:
        <br />
        <input
          type="text"
          value={selectedLegal_owner}
          onChange={(e) => setSelectedLegal_owner(e.target.value)} />
      </label>
      <br />
      <RadioButton
        label="Single node"
        value={searchType === "single"}
        onChange={handleSingleChange} />
      <RadioButton
        label="Immediate relationships of the node"
        value={searchType === "immediate"}
        onChange={handleImmediateChange} />
      <RadioButton
        label="All relationships of the node"
        value={searchType==="all"}
        onChange={handleAllChange} />
        <br />
      <input type="submit" value="Search" />
    </form>
  )
}

export default Legal_ownerForm;