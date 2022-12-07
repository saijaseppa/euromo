import { useState } from "react";
import AddEdge from "./AddEdge";
import AddNode from "./AddNode";
import queryMaker from "./queryMaker";

const SearchForm = ({ advancedCypher }) => {
  const [showAddNodeType, setShowAddNodeType] = useState(false);
  const [showAddEdge, setShowAddEdge] = useState(false);
  const [showAdd2Node, setShowAdd2Node] = useState(false);
  const [hideNodeButton, setHideNodeButton] = useState(false);
  const [hideEdgeButton, setHideEdgeButton] = useState(true);
  const [hideAddNode2Button, setHideAddNode2Button] = useState(true);

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
    setShowAddNodeType(false);
    setNode(node);
    setProperty(property);
    setChar(char);
    setPropertyValue(propertyValue);
    setHideEdgeButton(false);
    setHideNodeButton(true);
    //Calling the method to make cypher from node info.
    queryMaker.queryNode(node, property, char, propertyValue);
  }

  const addEdge = (edge) => {
    setShowAddEdge(false);
    console.log('edge value', edge);
    setEdge(edge);
    setHideAddNode2Button(false);
    setHideEdgeButton(true);

    //Calling the method to make cypher from edge info.
    queryMaker.queryEdge(edge);
  }

  const add2Node = (node, property, char, propertyValue) => {
    setShowAdd2Node(false);
    setNode2(node);
    setProperty2(property);
    setChar2(char);
    setPropertyValue2(propertyValue);

    //Calling the method to make cypher from node info.
    queryMaker.queryNode(node, property, char, propertyValue);
  }

  const makeSearch = (e) => {
    e.preventDefault();
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
    setShowAddNodeType(false);
    setShowAddEdge(false);
    setShowAdd2Node(false);
    setHideNodeButton(false);
    setHideEdgeButton(true);
    setHideAddNode2Button(true);
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
      <button disabled={hideNodeButton} onClick={() => setShowAddNodeType(!showAddNodeType)}>Add node</button>
      <button disabled={hideEdgeButton} onClick={() => setShowAddEdge(!showAddEdge)}>Add edge</button>
      <button disabled={hideAddNode2Button} onClick={() => setShowAdd2Node(!showAdd2Node)}>Add second node</button>
      <br />
      {showAddNodeType &&
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
