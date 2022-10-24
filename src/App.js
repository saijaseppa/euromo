import React, { useEffect } from "react";
import { VisualGraph, ResponsiveNeoGraph } from "./components/VisualGraph";
import Form from "./components/Form"
import './app.css'
import { useState } from "react";


// Url, user, password for Neo4j database access. 
// To be changed to match used database.
const NEO4J_URI = "bolt://localhost:7687";
const NEO4J_USER = "neo4j";
const NEO4J_PASSWORD = "testitesti";


/* 
 * Rendering App component. App is rendering other components. 
 */ 
const App = () => {


  return (
    <div className="App">
      <h1 className="head-title">Euromo data with React and Neovis.js</h1>
      <div className="row">
        <VisualGraph
          className="left-panel"
          containerId={"id1"}
          neo4jUri={NEO4J_URI}
          neo4jUser={NEO4J_USER}
          neo4jPassword={NEO4J_PASSWORD}
          
        />
        <Form
          className="right-panel"
        />
      </div>
    </div>
  );
}

export default App;
