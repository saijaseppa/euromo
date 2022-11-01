import { useState } from "react";

const TwoCountriesForm = ({ searchTwoCountries }) => {

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSecCountry, setSelectedSecCountry] = useState('');

  const handleSubmit = (e, selectedCountry, selectedSecCountry) => {
    e.preventDefault();
    searchTwoCountries(selectedCountry, selectedSecCountry);
    setSelectedCountry('');
    setSelectedSecCountry('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedCountry, selectedSecCountry)}>
      <h4>Find relationships between two countries</h4>
      <label>
        Select first country:
        <br />
        <input
          type="text"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)} />
      </label>
      <br />
      <label>
        Select second country:
        <br />
        <input
          type="text"
          value={selectedSecCountry}
          onChange={(e) => setSelectedSecCountry(e.target.value)} />
      </label>
      <br />
      <input type="submit" value="Search" />
    </form>
  )
}

export default TwoCountriesForm;