import { useRef } from "react";
import PersonOutletForm from "./PersonOutletForm";
import Togglable from "./Togglable";
import TwoCountriesForm from "./TwoCountriesForm";
import OutletForm from "./OutletForm";
import PersonForm from "./PersonForm";
import SubstringForm from "./SubstringForm";

const Form = ({ formCypherForTwoCountries, formCypherForPersonOutlet, formCypherForOutlet, formCypherForSubstring, formCypherForPerson }) => {

  const cypherFormRef = useRef();

  /* Function to make cypher call with two countries the user gave.  
   Takes name's of the countries from state and sends them to App. */
  const searchTwoCountries = (country1, country2) => {
    console.log('In Form: searching for', country1, country2);
    const search = {
      country1: capitalizeFirstLetter(country1),
      country2: capitalizeFirstLetter(country2)
    };
    formCypherForTwoCountries(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to make cypher call with names of person and outlet the user gave.  
   Takes name's from state and sends them to App. */
  const searchPersonOutlet = (name, outlet) => {
    console.log('In Form: searching for ', name, outlet);
    const search = {
      name: capitalizeFirstLetter(name),
      outlet: capitalizeFirstLetter(outlet)
    }
    formCypherForPersonOutlet(search);
    cypherFormRef.current.toggleVisibility();
    
  }

  const searchOutlet = (outlet) => {
    console.log('In Form: searching for ', outlet);
    const search = {
      outlet: capitalizeFirstLetter(outlet)
    }
    formCypherForOutlet(search);
    cypherFormRef.current.toggleVisibility();
  }

  const searchPerson = (name) => {
    console.log('In Form: searching for ', name);
    const search = {
      name: capitalizeFirstLetter(name)
    }
    formCypherForPerson(search);
    cypherFormRef.current.toggleVisibility();
  }

  const searchSubstring = (word) => {
    console.log('In Form: searching for ', word);
    const search = {
      word: word
    }

    formCypherForSubstring(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to capitalize the first letter of the word,
     needed in the names of the countries, persons and outlets. */
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div>
      <h2>Search options: </h2>
      <br/>
      <Togglable buttonLabel="Search with only part of the word" ref={cypherFormRef}>
        <SubstringForm searchSubstring={searchSubstring}/>
      </Togglable>
      <br/>
      <br/>
      <br/>
      <Togglable buttonLabel="Find all owners of the outlet" ref={cypherFormRef}>
        <OutletForm searchOutlet={searchOutlet}/>
      </Togglable>
      <br/>
      <Togglable buttonLabel="Find all media owned by a person" ref={cypherFormRef}>
        <PersonForm searchPerson={searchPerson}/>
      </Togglable>
      <br/>
      <Togglable buttonLabel="Find relationships between two countries" ref={cypherFormRef}>
        <TwoCountriesForm searchTwoCountries={searchTwoCountries} />
      </Togglable>
      <br/>
      <Togglable buttonLabel="Find relationships between person and outlet" ref={cypherFormRef}>
        <PersonOutletForm searchPersonOutlet={searchPersonOutlet}/>
      </Togglable>
      <br/>

      
    </div>
  )

}

export default Form
