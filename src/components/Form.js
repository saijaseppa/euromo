import { useRef, useState } from "react";
import PersonOutletForm from "./Basic-search/PersonOutletForm";
import Togglable from "./Togglable";
import TwoCountriesForm from "./Basic-search/TwoCountriesForm";
import OutletForm from "./Basic-search/OutletForm";
import PersonForm from "./Basic-search/PersonForm";
import SubstringForm from "./Basic-search/SubstringForm";
import SearchForm from "./Advanced-search/SearchForm";
import Legal_ownerForm from "./Basic-search/Legal_ownerForm";
import OutletLegalOwnerForm from "./Basic-search/OuletLegalOwnerForm";

const Form = ({ formCypherForTwoCountries, formCypherForPersonOutlet, formCypherForOutlet, formCypherForSubstring, formCypherForPerson, formCypherForLegal_owner, formCypherForOutletLegal_owner }) => {

  const cypherFormRef = useRef();

  const [searchMode, setSearchMode] = useState(null);

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

  const searchOutletLegal_owner = (legal_owner, outlet) => {
    const search = {
      legal_owner: capitalizeFirstLetter(legal_owner),
      outlet: capitalizeFirstLetter(outlet)
    }
    formCypherForOutletLegal_owner(search);
  }

  const searchOutlet = (outlet, type) => {
    console.log('In Form: searching for ', outlet, type);
    const search = {
      outlet: capitalizeFirstLetter(outlet),
      type: type
    }
    formCypherForOutlet(search);
    cypherFormRef.current.toggleVisibility();
  }

  const searchPerson = (name, type) => {
    console.log('In Form: searching for ', name);
    const search = {
      name: capitalizeFirstLetter(name),
      type: type
    }
    formCypherForPerson(search);
    cypherFormRef.current.toggleVisibility();
  }

  const searchLegal_owner = (owner, type) => {
    console.log('formissa', owner);
    const search = {
      owner: owner,
      type: type
    }
    formCypherForLegal_owner(search);
  }

  const searchSubstring = (word) => {
    const search = {
      word
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
      {/*<h3>Options: </h3>*/}
      <div className="btn-group">
        <button className="selectButton" onClick={(e) => setSearchMode('basic')}>Basic search</button>
        <button className="selectButton" onClick={(e) => setSearchMode('advanced')}>Advanced search</button>
      </div>
      {searchMode === 'basic' ? (
        <div>
          <br />
          <br />
          <br />
          <div className="basic-search-options">
            <br />
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
              <Legal_ownerForm searchLegal_owner={searchLegal_owner} />
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
              <OutletLegalOwnerForm searchOutletLegal_owner={searchOutletLegal_owner} />
            </Togglable>
            <br />
          </div>
        </div>
      ) : null}
      {searchMode === 'advanced' ? (
        <div>
          <br />
          <br />
          <SearchForm />
        </div>
      ) : null}
    </div>
  )

}

export default Form;
