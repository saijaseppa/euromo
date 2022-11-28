import { useState } from "react";
import { VisualGraph, ResponsiveNeoGraph } from "./components/VisualGraph";
import Form from "./components/Form"
import Logo from "./components/Logo";
import './app.css'


const Start = ({ uri, user, password }) => {
  
  const NEO4J_URI = uri;
  const NEO4J_USER = user;
  const NEO4J_PASSWORD = password;

  const [cypher, setCypher] = useState('');
  //const [message, setMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchDone, setSearchDone] = useState(false);

  const formCypherForTwoCountries = ({ country1, country2 }) => {
    setCypher(`MATCH (x:Country{Name:'${country1}'})<-[r:FROM]-(z:Legal_owners)-[o:OWNS]-(w:Legal_owners)-[e:FROM]-> (y:Country{Name:'${country2}'}) return x,y,z,w,r,o,e`);
    setSearchPhrase(`${country1} and ${country2}`)
    setSearchDone(true);
  }

  const formCypherForPersonOutlet = ({ name, outlet }) => {
    setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[i:OWNS*..6]-(y:Legal_owners) <-[j:OWNS*..6]- (z:Persons{Name:'${name}'}) return x,y,z,i,j`);
    setSearchPhrase(`${name} and ${outlet}`);
    setSearchDone(true);
  }

  const formCypherForOutletLegal_owner = ({ outlet, legal_owner }) => {
    setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[i:OWNS*..6]- (y:Legal_owners) <-[j:OWNS*..6]- (z:Legal_owners{Name:'${legal_owner}'}) return x,y,z,i,j`);
    setSearchPhrase(`${legal_owner} and ${outlet}`);
    setSearchDone(true);
  }

  const formCypherForOutlet = ({ outlet, type }) => {
    if (type === "single") {
      setCypher(`MATCH (n{Name:"${outlet}"}) return n`);
    }
    else if (type === "immediate") {
      setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) -[i:OWNS|FROM]- (y) return x,i,y`);
    }
    else if (type === "all") {
      setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[i:OWNS*..6]-(y:Legal_owners) <-[j:OWNS*..6]- (z:Persons) return x,y,z,i,j`)
    }
    setSearchPhrase(`${outlet}`);
    setSearchDone(true);
  }

  const formCypherForPerson = ({ name, type }) => {
    if (type === "single") {
      setCypher(`MATCH (n{Name:"${name}"}) return n`);
    }
    else if (type === "immediate") {
      setCypher(`MATCH (x:Persons{Name:'${name}'})-[i:OWNS|FROM]-> (y) return x,i,y`);
    }
    else if (type === "all") {
      setCypher(`MATCH (x:Persons{Name:'${name}'})-[i:OWNS*]->(y:Legal_owners) MATCH (y)-[j:OWNS|FROM*]->(z) return x,y,z,i,j`);
    }
    setSearchPhrase(`${name}`);
    setSearchDone(true);
  }

  const formCypherForLegal_owner = ({ owner, type }) => {
    if (type === "single") {
      setCypher(`MATCH (n{Name:"${owner}"}) return n`);
    }
    else if (type === "immediate") {
      setCypher(`MATCH (x:Legal_owners{Name:'${owner}'}) -[i:OWNS|FROM]- (y) return x,i,y`);
    }
    else if (type === "all") {
      setCypher(``);
    }
    setSearchPhrase(`${owner}`);
    setSearchDone(true);
  }

  const formCypherForSubstring = ({ word }) => {
    setCypher(`MATCH (n) WHERE n.Name =~ '(?i).*${word}.*' RETURN n`);
    setSearchPhrase(`${word}*`);
    setSearchDone(true);
  }

  const makeVisualGraphWithAdvancedCypher = (cypher) => {
    setCypher(cypher);
    setSearchDone(true);
  }

  const notification = (vis) => {
    console.log('sended vis:', vis);
  }

  return (
    <div className="App">
      < Logo />
      <h2 className="head-title">Visualized data query</h2>
      {showNotification ? (
        <div className="notification">No results!</div>
      ) : null}
      <br />

      {searchDone ? (
        <h3 className="result-title">Results for {searchPhrase}</h3>
      ) : null}

      <div className="row">
        <Form className="left-panel"
          formCypherForTwoCountries={formCypherForTwoCountries}
          formCypherForPersonOutlet={formCypherForPersonOutlet}
          formCypherForOutlet={formCypherForOutlet}
          formCypherForSubstring={formCypherForSubstring}
          formCypherForPerson={formCypherForPerson}
          formCypherForLegal_owner={formCypherForLegal_owner}
          formCypherForOutletLegal_owner={formCypherForOutletLegal_owner}
          makeVisualGraphWithAdvancedCypher={makeVisualGraphWithAdvancedCypher}
        />
        <VisualGraph className="right-panel"
          containerId={"id1"}
          neo4jUri={NEO4J_URI}
          neo4jUser={NEO4J_USER}
          neo4jPassword={NEO4J_PASSWORD}
          cypher={cypher}
          notification={notification}
        />
      </div>
    </div>
  )
}

export default Start;