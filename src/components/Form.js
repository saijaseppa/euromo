import { useState } from "react";
import { VisualGraph } from "./VisualGraph";

const Form = ({ formCypher }) => {

  const [ selectedCountry, setSelectedCountry ] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked');
    console.log('searching for', selectedCountry);

    formCypher(selectedCountry);

  }

  const handleCountry = (e) => {
    console.log('value changed');
    setSelectedCountry(e.target.value);
  }

  return(
    <div>
      <h3>Select what to search</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Select country:
          <select onChange={handleCountry}>
            <option value="Finland">Finland</option>
            <option value="Sweden">Sweden</option>
          </select>
        </label>

        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default Form