//tässä epäloogisuutta boolen arvoissa, nimiin hide vai show?

import { useState } from "react";
import AddEdge from "./AddEdge";
import AddNode from "./AddNode";
import queryMaker from "./queryMaker";

const SearchForm = ({ advancedCypher }) => {
  const [showAddNode, setShowAddNode] = useState(false);
  const [showAddEdge, setShowAddEdge] = useState(false);
  const [showAdd2Node, setShowAdd2Node] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showEdgeButton, setShowEdgeButton] = useState(true);
  const [showAddNodeButton, setShowAddNodeButton] = useState(true);

  const [node, setNode] = useState('');
  const [property, setProperty] = useState('');
  const [char, setChar] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [edge, setEdge] = useState('');
  const [node2, setNode2] = useState('');
  const [property2, setProperty2] = useState('');
  const [char2, setChar2] = useState('');
  const [propertyValue2, setPropertyValue2] = useState('');

  const addNode = (node, property, char, propertyValue) => {
    console.log('addNodessa noden tiedot: ', node, property, char, propertyValue);
    setShowAddNode(false);
    setNode(node);
    setProperty(property);
    setChar(char);
    setPropertyValue(propertyValue);
    setShowEdgeButton(false);
    setShowButton(true);
    //Calling the method to make cypher from node info.
    queryMaker.queryNode(node, property, char, propertyValue);
  }

  const addEdge = (edge) => {
    setShowAddEdge(false);
    console.log('edge value', edge);
    setEdge(edge);
    setShowAddNodeButton(false);
    setShowEdgeButton(true);

    //Calling the method to make cypher from edge info.
    queryMaker.queryEdge(edge);
  }

  const add2Node = (node, property, char, propertyValue) => {
    setShowAdd2Node(false);
    console.log('node add2node', node);
    setNode2(node);
    setProperty2(property);
    setChar2(char);
    setPropertyValue2(propertyValue);

    //Calling the method to make cypher from node info.
    queryMaker.queryNode(node, property, char, propertyValue);
  }

  const makeSearch = (e) => {
    //e.preventDefault();
    //Calling method to get whole query 
    const formedCypher = queryMaker.getQuery();
    console.log('formed cypher:', formedCypher);
    advancedCypher(formedCypher);
    //In the end clearing selected nodes and edges. 
    handleClearAll(e);
  }
  
  /*  handleClearAll get event as a prop, and
   *  sets all states to initial state. 
   */
  const handleClearAll = (e) => {
    e.preventDefault();
    setNode('');
    setProperty('');
    setChar('');
    setPropertyValue('');
    setEdge('');
    setNode2('');
    setChar2('');
    setProperty2('');
    setPropertyValue2('');
    setShowAddNode(false);
    setShowAddEdge(false);
    setShowAdd2Node(false);
    setShowButton(false);
    setShowEdgeButton(true);
    setShowAddNodeButton(true);
  }

  return (
    <div>
      <br />
      <p>Advanced search. Select first node.</p>
      <div>
        {node} {property} {char} {propertyValue}
      </div>
      <div>
        {edge}
      </div>
      <div>
        {node2} {property2} {char2} {propertyValue2}
      </div>
      <br />
      <button disabled={showButton} onClick={(e) => setShowAddNode(!showAddNode)}>Add node</button>
      <button disabled={showEdgeButton} onClick={(e) => setShowAddEdge(!showAddEdge)}>Add edge</button>
      <button disabled={showAddNodeButton} onClick={(e) => setShowAdd2Node(!showAdd2Node)}>Add second node</button>
      <br />
      {showAddNode &&
        <AddNode addNode={addNode} />
      }
      {showAddEdge &&
        <AddEdge addEdge={addEdge} />
      }
      {showAdd2Node &&
        <AddNode addNode={add2Node} />}
      <br />
      
      <button onClick={(e) => makeSearch(e)}>Search</button>
      <br />
      <button onClick={handleClearAll}>Clear all</button>
    </div>
  )

}

export default SearchForm;

/*

<QueryMaker queryNode={queryNode} />


<select value={selectedNode} onChange={(e) => setSelectedNode(e.target.value)}>
          {nodeTypes.map(n => 
            <option key={n} value={n}>{n}</option>
          )}
          </select>
          */

/**/


/*
      <label>
Add node
<br />
<Select
className="select-node"
classNamePrefix="select"
isClearable={isClearable}
name="nodeTypes"
options={nodeTypes}
onChange={setSelectedNode} />
</label>

{chooseProperties &&
<label>
Choose properties
<br />
<Select
  className="select-property"
  //classNamePrefix="select"
  isClearable={isClearable}
  name="properties"
  options={selectedPropertyList}
  onChange={setSelectedProperty} />
</label>}

{givePropertyName &&
<input type="text" placeholder="give name" />
}
<br />
<br />
<button onClick={handleClearAll}>Clear all</button>*/