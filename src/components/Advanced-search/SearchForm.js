import { useState } from "react";
import AddEdge from "./AddEdge";
import AddNode from "./AddNode";
import queryMaker from "./queryMaker";
import Button from "../Button";
/**
 * 
 * @param {*} param0 
 * @returns 
 */
const SearchForm = ({ advancedCypher }) => {
  const [showAddNodeType, setShowAddNodeType] = useState(false);
  const [showAddEdge, setShowAddEdge] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [buttonType, setButtonType] = useState('node');
  const [buttonList, setButtonList] = useState([{ index: 0, disabled: false, type: 'node' }]);
  const [givenSearchOptionsList, setGivenSearchOptionsList] = useState([]);
  /**
   * 
   */
  const addNewButton = () => {
    const newButton = {
      index: buttonList.length,
      disabled: disabled,
      type: buttonType
    }

    let newList = [...buttonList, newButton];
    setButtonList(newList);

    buttonList.map((button) => {
      if (button.index <= buttonList.length) {
        button.disabled = true;
      }
    })
  }
  /**
   * 
   * @param {*} buttonType 
   */
  const openNodeOrEdgeAdding = (buttonType) => {
    if (buttonType === "node") {
      setShowAddNodeType(!showAddNodeType);
      setButtonType('edge');
    }
    else {
      setShowAddEdge(!showAddEdge)
      setButtonType('node');
    }
  }
  /**
   * 
   * @param {*} node 
   * @param {*} property 
   * @param {*} char 
   * @param {*} propertyValue 
   */
  const addNode = (node, property, char, propertyValue) => {
    setShowAddNodeType(false);
    addNewButton();

    // Calling the method to make cypher from node info.
    queryMaker.queryNode(node, property, char, propertyValue);

    // Creating new string from node-info and pushing it to
    // list of given search parameters. 
    let newNode = '';
    if (!property) {
      newNode = `${node}`
    }
    else {
      newNode = `${node} ${property} ${char} ${propertyValue}`
    }
    let newList = [...givenSearchOptionsList, newNode];
    setGivenSearchOptionsList(newList);
  }
  /**
   * 
   * @param {*} edge 
   * @param {*} checkedInv 
   * @param {*} checkedRel 
   */
  const addEdge = (edge, checkedInv, checkedRel) => {
    let newEdge = ''
    setShowAddEdge(false);
    // Calling function to add new button
    addNewButton();

    if (checkedInv && checkedRel) {
      // Creating new string from node-info
      newEdge = `${edge} *inverse`
    }
    else if (checkedInv) {
      // Creating new string from node-info
      newEdge = `${edge} inverse`
    }
    else if (checkedRel) {
      // Creating new string from node-info
      newEdge = `${edge} *`
    }
    else {
      // Creating new string from node-info
      newEdge = `${edge}`
    }

    //Calling the method to make cypher from edge info.
    queryMaker.queryEdge(edge, checkedInv, checkedRel);
    // Pushing string of edge-info to
    // list of given search parameters. 
    let newList = [...givenSearchOptionsList, newEdge];
    setGivenSearchOptionsList(newList);
  }
  /**
   * 
   * @param {*} e 
   */
  const makeSearch = (e) => {
    e.preventDefault();
    //Calling method to get whole query 
    const formedCypher = queryMaker.getQuery();
    console.log('formed cypher:', formedCypher);
    advancedCypher(formedCypher);
    //In the end clearing selected nodes and edges. 
    setButtonType('node');
    handleClearAll(e);
  }

  /**  handleClearAll gets event as a prop, and
    *  sets all states to initial state. 
    */
  /**
   * 
   * @param {*} e 
   */
  const handleClearAll = (e) => {
    e.preventDefault();
    setShowAddNodeType(false);
    setShowAddEdge(false);
    setButtonList([{ index: 0, disabled: false, type: 'node' }]);
    setGivenSearchOptionsList([]);
    queryMaker.deleteFormedQuery();
  }

  return (
    <div>
      <br />
      <p>Advanced search. Start by selecting first node.</p>
      <div>
        { // Mapping list of search parameters to show them to user.
          givenSearchOptionsList.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
      </div>
      <br />

      { //Mapping through buttonList to show right buttons.
        buttonList.map((button) => (
          <Button
            key={button.index}
            disabled={button.disabled}
            buttonType={button.type}
            openNodeOrEdgeAdding={openNodeOrEdgeAdding}
          ></Button>
        ))}

      <br />
      <br />

      {showAddNodeType &&
        <AddNode addNode={addNode} />
      }
      {showAddEdge &&
        <AddEdge addEdge={addEdge} />
      }
      <br />

      <button onClick={(e) => makeSearch(e)}>Search</button>
      <br />
      <button onClick={handleClearAll}>Clear all</button>
    </div>
  )

}

export default SearchForm;
