import { useRef, useState } from "react";
import PersonOutletForm from "./Basic-search/PersonOutletForm";
import Togglable from "./Togglable";
import TwoCountriesForm from "./Basic-search/TwoCountriesForm";
import OutletForm from "./Basic-search/OutletForm";
import PersonForm from "./Basic-search/PersonForm";
import SubstringForm from "./Basic-search/SubstringForm";
import SearchForm from "./Advanced-search/SearchForm";
import LegalOwnerForm from "./Basic-search/LegalOwnerForm";
import OutletLegalOwnerForm from "./Basic-search/OuletLegalOwnerForm";

const Form = ({ formCypherForTwoCountries, formCypherForPersonOutlet, formCypherForOutlet, formCypherForSubstring, formCypherForPerson, formCypherForLegalOwner, formCypherForOutletLegalOwner, makeVisualGraphWithAdvancedCypher }) => {

  const cypherFormRef = useRef();
  const [searchMode, setSearchMode] = useState(null);

  /* Function to make cypher call with two countries the user gave.  
   Takes names of the countries from state and sends them to Start. */
  const searchTwoCountries = (country1, country2) => {
    const search = {
      country1: capitalizeFirstLetter(country1),
      country2: capitalizeFirstLetter(country2)
    };
    formCypherForTwoCountries(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to make cypher call with names of person and outlet the user gave.  
   Takes names from state and sends them to Start. */
  const searchPersonOutlet = (name, outlet) => {
    const search = {
      name: capitalizeFirstLetter(name),
      outlet: capitalizeFirstLetter(outlet)
    }
    formCypherForPersonOutlet(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to make cypher call with legal owner and outlet the user gave.  
   Takes names from state and sends them to Start. */
  const searchOutletLegalOwner = (legal_owner, outlet) => {
    const search = {
      legal_owner: capitalizeFirstLetter(legal_owner),
      outlet: capitalizeFirstLetter(outlet)
    }
    formCypherForOutletLegalOwner(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to make cypher call with outlet the user gave. 
   Type is telling the scope for search. 
   Takes names from state and sends them to Start. */
  const searchOutlet = (outlet, type) => {
    const search = {
      outlet: capitalizeFirstLetter(outlet),
      type: type
    }
    formCypherForOutlet(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to make cypher call with person name the user gave. 
   Type is telling the scope for search. 
   Takes names from state and sends them to Start. */
  const searchPerson = (name, type) => {
    const search = {
      name: capitalizeFirstLetter(name),
      type: type
    }
    formCypherForPerson(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to make cypher call with owner the user gave. 
   Type is telling the scope for search. 
   Takes names from state and sends them to Start. */
  const searchLegalOwner = (owner, type) => {
    const search = {
      owner: capitalizeFirstLetter(owner),
      type: type
    }
    formCypherForLegalOwner(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to make cypher call with string the user gave.
   Takes string from state and sends them to Start. */
  const searchSubstring = (word) => {
    const search = {
      word
    }
    formCypherForSubstring(search);
    cypherFormRef.current.toggleVisibility();
  }

  /* Function to pass cypher to Start from advanced search. */
  const advancedCypher = (cypher) => {
    makeVisualGraphWithAdvancedCypher(cypher);
  }

  /* Function to capitalize the first letter of the word,
     needed in the names of the countries, persons and outlets. */
  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div>
      {<h3>Choose how to search: </h3>}
      <div className="btn-group">
        <button className="selectButton" onClick={(e) => setSearchMode('basic')}>Basic search</button>
        <br />
        <button className="selectButton" onClick={(e) => setSearchMode('advanced')}>Advanced search</button>
      </div>
      {searchMode === 'basic' ? (
        <div>
          <br />
          <br />
          <br />
          <div className="basic-search-options">
            <p>Basic search with pre-given options</p>
            
            <Togglable buttonLabel="Search with only part of the word" ref={cypherFormRef}>
              <SubstringForm searchSubstring={searchSubstring} />
            </Togglable>
            <br />
            <Togglable buttonLabel="Find by the outlet" ref={cypherFormRef}>
              <OutletForm searchOutlet={searchOutlet} />
            </Togglable>
            <br />
            <Togglable buttonLabel="Find by the person" ref={cypherFormRef}>
              <PersonForm searchPerson={searchPerson} />
            </Togglable>
            <br />
            <Togglable buttonLabel="Find by the legal owner" ref={cypherFormRef}>
              <LegalOwnerForm searchLegalOwner={searchLegalOwner} />
            </Togglable>
            <br />
            <Togglable buttonLabel="Find relationships between two countries" ref={cypherFormRef}>
              <TwoCountriesForm searchTwoCountries={searchTwoCountries} />
            </Togglable>
            <br />
            <Togglable buttonLabel="Find relationships between person and outlet" ref={cypherFormRef}>
              <PersonOutletForm searchPersonOutlet={searchPersonOutlet} />
            </Togglable>
            <br />
            <Togglable buttonLabel="Find relationships between outlet and legal owner" ref={cypherFormRef}>
              <OutletLegalOwnerForm searchOutletLegalOwner={searchOutletLegalOwner} />
            </Togglable>
            <br />
          </div>
        </div>
      ) : null}
      {searchMode === 'advanced' ? (
        <div>
          <br />
          <br />
          <SearchForm advancedCypher={advancedCypher}/>
        </div>
      ) : null}
    </div>
  )

}

export default Form;
