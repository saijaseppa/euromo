import { useState } from "react";
import RadioButton from "../RadioButton";

const PersonForm = ({ searchPerson }) => {

  const [selectedName, setSelectedName] = useState('');
  const [searchType, setSearchType] = useState("single");

  const handleSubmit = (e, name) => {
    e.preventDefault();
    searchPerson(name, searchType);
    setSelectedName('');
    setSearchType("single")
  }

  const handleSingleChange = (e) => {
    setSearchType("single");
  }
  const handleImmediateChange = () => {
    setSearchType("immediate");
  }
  const handleAllChange = () => {
    setSearchType("all");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedName)}>
      <h4>Find by a person</h4>
      <label>
        Last name of the person:
        <br/>
        <input
          type="text"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)} />
      </label>
      <br/>
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

export default PersonForm;