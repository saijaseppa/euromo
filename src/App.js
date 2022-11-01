import { useState } from "react";
import { VisualGraph, ResponsiveNeoGraph } from "./components/VisualGraph";
import Form from "./components/Form"
import Notification from "./components/Notification";
import './app.css'

const NEO4J_URI = "bolt://localhost:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "testitesti";

const App = () => {

  const [ cypher, setCypher ] = useState('');
  //const [message, setMessage] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [searchDone, setSearchDone] = useState(false);

  const formCypherForTwoCountries = ({ country1, country2 }) => {
    //TOIMII TÄYSIN 
    setCypher(`MATCH (x:Country{Name:'${country1}'})<-[r:FROM]-(z:Legal_owners)-[o:OWNS]-(w:Legal_owners)-[e:FROM]-> (y:Country{Name:'${country2}'}) return x,y,z,w,r,o,e`);
    setSearchPhrase(`${country1} and ${country2}`)
    setSearchDone(true);
  }

  const formCypherForPersonOutlet = ({ name, outlet }) => { 
    //TÄHTIKYSELYT EI TOIMI, EI SUHTEITA
    //setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[*]-(y:Legal_owners) <-[*]- (z:Persons{Name:'${name}'}) return x,y,z`); 

    setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[i:OWNS*..6]-(y:Legal_owners) <-[j:OWNS*..6]- (z:Persons{Name:'${name}'}) return x,y,z,i,j`);

    //setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[i:OWNS]-(y:Legal_owners) <-[j:OWNS]- (z:Persons{Name:'${name}'}) return x,y,z,i,j`);
    // `MATCH (z:Persons{Name:'${name}'}) –[i:OWNS]-> (y:Legal_owners) -[j:OWNS]-> (x:Outlets{Name:'${outlet}'}) return x,y,z,i,j`
    setSearchPhrase(`${name} and ${outlet}`);
    setSearchDone(true);
  }

  const formCypherForOutlet = ({outlet}) => {
    // MUUTEN OK MUTTA TÄHTIKYSELY EI TOIMI, EI SUHTEITA 
    // legal owners: setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[i:OWNS]-(y:Legal_owners) return x,y,i`)
    //henkilöomistajat: setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[*]- (y:Persons) return y`);
    setCypher(`MATCH (x:Outlets{Name:'${outlet}'}) <–[i:OWNS*..6]-(y:Legal_owners) <-[j:OWNS*..6]- (z:Persons) return x,y,z,i,j`)
    setSearchPhrase(`${outlet}`);
    setSearchDone(true);
  }

  const formCypherForSubstring = ({word}) => {
    //TOIMII
    setCypher(`MATCH (n) WHERE n.Name =~ '(?i).*${word}.*' RETURN n`);
    setSearchPhrase(`${word}*`);
    setSearchDone(true);
  }

  const formCypherForPerson = ({name}) => {
    // MUUTEN OK MUTTA TÄHTIKYSELYT EI TOIMI
    console.log('apissa haku henkilölle', name);
    
    setCypher(`MATCH (x:Persons{Name:'${name}'})-[i:OWNS*]->(y:Legal_owners) MATCH (y)-[j:OWNS|FROM*]->(z) return x,y,z,i,j`);
    setSearchPhrase(`${name}`);
    setSearchDone(true);
  }


  const notification = ( vis ) => {

  }
  //_data.nodes.length

  return (
    <div className="App">
      <h1 className="head-title">Euromo data with React and Neovis.js</h1>
      {showNotification ? (
        <div className="notification">No results!</div>
      ): null}
      <br />
      {searchDone ? (
        <h3>Search results for {searchPhrase}</h3>
      ): null}
      
      <div className="row">
        <VisualGraph
          className="left-panel"
          containerId={"id1"}
          neo4jUri={NEO4J_URI}
          neo4jUser={NEO4J_USER}
          neo4jPassword={NEO4J_PASSWORD}
          cypher={cypher}
          notification={notification}
          
        />
        <Form
          className="right-panel"
          formCypherForTwoCountries={formCypherForTwoCountries}
          formCypherForPersonOutlet={formCypherForPersonOutlet}
          formCypherForOutlet={formCypherForOutlet}
          formCypherForSubstring={formCypherForSubstring}
          formCypherForPerson={formCypherForPerson}
        />
      </div>
    </div>
  );
}
/*<Notification message={message} />
        backgroundColor={"#b2beb5"}
 width={800}
          height={600}
<ResponsiveNeoGraph
        containerId={"id0"}
        neo4jUri={NEO4J_URI}
        neo4jUser={NEO4J_USER}
        neo4jPassword={NEO4J_PASSWORD}
      />


          //console.log('vis appissa', vis._nodes);
    //console.log('nodes', vis.t);
    /*if (vis._nodes.nodes === undefined) {
      //console.log('vis appissa', vis._data.nodes.length);
      setShowNotification(true);
      //setMessage("No results for the search!");

      setTimeout(() => {
        setShowNotification(false);
      }, 5000)
    }*/


export default App;
