import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Start from "./Start";
import NotFound from "./NotFound";
import './app.css'

const App = () => {

  const NEO4J_URI = process.env.REACT_APP_NEO4J_URI;
  const NEO4J_USER = process.env.REACT_APP_NEO4J_USER;
  const NEO4J_PASSWORD = process.env.REACT_APP_NEO4J_PASSWORD;

  return (
    <div>
      <Routes>
        <Route path="/neo4jvisualization" element={<Start uri={NEO4J_URI} user={NEO4J_USER} password={NEO4J_PASSWORD} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
    }
    /*
        <select value={selectedNode} onChange={(e) => setSelectedNode(e.target.value)}>
          {options.map(o => 
            <option key={o} value={o}>{o}</option>
          )}
          </select>
          
    
          */


export default App;
