import { useEffect, useState } from "react";
import Add2Node from "./Add2Node";
import AddEdge from "./AddEdge";
import AddNode from "./AddNode";

const SearchForm = () => {
  const [showAddNode, setShowAddNode] = useState(false);
  const [showAddEdge, setShowAddEdge] = useState(false);
  const [showAdd2Node, setShowAdd2Node] = useState(false);

  const [node, setNode] = useState('');
  const [property, setProperty] = useState('');
  const [char, setChar] = useState('');
  const [propertyValue, setPropertyValue] = useState('');
  const [edge, setEdge] = useState('');
  const [node2, setNode2] = useState('');
  const [property2, setProperty2] = useState('');
  const [char2, setChar2] = useState('');
  const [propertyValue2, setPropertyValue2] = useState('');

  const addNode = (nodeType, property, char, propertyValue) => {
    console.log('addNodessa noden tiedot: ', nodeType, property, char, propertyValue);
    setShowAddNode(false);
    setNode(nodeType);
    setProperty(property);
    setChar(char);
    setPropertyValue(propertyValue);
  }

  const addEdge = (edge) => {
    setShowAddEdge(false);
    console.log('edge value', edge);
    setEdge(edge);
  }

  const add2node = (node, property, char, propertyValue) => {
    setShowAdd2Node(false);
    console.log('node add2node', node);
    setNode2(node);
    setProperty2(property);
    setChar2(char);
    setPropertyValue2(propertyValue);
  }

  const handleClearAll = (e) => {
    e.preventDefault();
    setNode('');
    setProperty('');
    setChar('');
    setPropertyValue('');
    setEdge('');
    setNode2('');
    setShowAddNode(false);
    setShowAddEdge(false);
    setShowAdd2Node(false);
  }

  return (
    <div>
      <br />
      <p>Advanced things happens here</p>
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
      <button onClick={(e) => setShowAddNode(!showAddNode)}>Add node</button>
      <button onClick={(e) => setShowAddEdge(!showAddEdge)}>Add edge</button>
      <button onClick={(e) => setShowAdd2Node(!showAdd2Node)}>Add second node</button>
      <br />
      {showAddNode &&
        <AddNode addNode={addNode} />
      }
      {showAddEdge &&
        <AddEdge addEdge={addEdge} />
      }
      {showAdd2Node &&
        <Add2Node add2node={add2node} />}
      <br />
      <button onClick={handleClearAll}>Clear all</button>
    </div>
  )

}

export default SearchForm;

/*
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