import { useState } from "react";
import RadioButton from "../RadioButton";

const OutletForm = ({ searchOutlet }) => {

  const [selectedOutlet, setSelectedOutlet] = useState('');
  const [searchType, setSearchType] = useState("single");

  const handleSubmit = (e, outlet) => {
    e.preventDefault();
    searchOutlet(outlet, searchType);
    setSelectedOutlet('');
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
    <form onSubmit={(e) => handleSubmit(e, selectedOutlet)}>
      <h4>Find by the outlet</h4>
      <label>
        Name of the outlet:
        <br />
        <input
          type="text"
          value={selectedOutlet}
          onChange={(e) => setSelectedOutlet(e.target.value)} />
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

export default OutletForm;