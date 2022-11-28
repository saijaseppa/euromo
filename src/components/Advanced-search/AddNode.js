import Select from 'react-select';
import { useEffect, useState } from "react";


const AddNode = ({ addNode }) => {

  const nodeTypes = [
    { value: "Persons", label: "Person owner" },
    { value: "Outlets", label: "Outlet" },
    { value: "Legal_owners", label: "Legal owner" },
    { value: "Country", label: "Country" },
    { value: "any node", label: "*" }
  ];

  const CountryPropertyList = [{ value: "Name", label: "Country name" }];
  const PersonPropertyList = [{ value: "Name", label: "Name" }]
  const OutletPropertyList = [{ value: "Name", label: "Name" }]
  const Legal_ownerPropertyList = [{ value: "Name", label: "Name" }]

  const chars = [{ value: "=", label: "=" }]
  //, { value: "<", label: "<" }, { value: ">", label: ">" } <- extras to chars array for future

  const [isClearable, setIsClearable] = useState(true);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedPropertyList, setSelectedPropertyList] = useState(null);
  const [selectedChar, setSelectedChar] = useState('');
  const [givenInput, setGivenInput] = useState('');


  const [chooseProperties, setChooseProperties] = useState(false);
  const [givePropertyName, setGivePropertyName] = useState(false);
  const [giveChar, setGiveChar] = useState(false);
  const [readySubmit, setReadySubmit] = useState(false);

  useEffect(() => {
    if (selectedNode !== null) {
      if (selectedNode.value === "Country") {
        setSelectedPropertyList(CountryPropertyList);
        //setChooseProperties(true);
      }
      if (selectedNode.value === "Persons") {
        setSelectedPropertyList(PersonPropertyList);
        //setChooseProperties(true);
      }
      if (selectedNode.value === "Legal_owners") {
        setSelectedPropertyList(Legal_ownerPropertyList);
        //setChooseProperties(true);
      }
      if (selectedNode.value === "Outlets") {
        setSelectedPropertyList(OutletPropertyList);
        //setChooseProperties(true);
      }
      if (selectedNode.value === "any node") {
        setReadySubmit(true);
      }

    }
  }, [selectedNode]);

  useEffect(() => {
    if (selectedNode && selectedProperty) {
      setGiveChar(true);
    }

  }, [selectedProperty]);

  useEffect(() => {
    if (selectedNode && selectedProperty && selectedChar) {
      setGivePropertyName(true);
      setReadySubmit(true);
    }
  }, [selectedChar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked');
    addNode(selectedNode.value, selectedProperty.value, selectedChar.value, givenInput)
  }

  return (
    <div>
      <form className="ad-options" onSubmit={(e) => handleSubmit(e)}>
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

        {selectedNode && !chooseProperties && selectedNode.value!=='any node' &&
          <div>
            <p>Select</p>
            <button onClick={(e) => setChooseProperties(true)}>Add property to node</button>
            <p>or</p>
            <button onClick={(e) => setReadySubmit(true)}>Node ready</button>
          </div>
        }
        <br />
        {chooseProperties &&
          <label>
            Choose property
            <br />
            <Select
              className="select-property"
              //classNamePrefix="select"
              isClearable={isClearable}
              name="properties"
              options={selectedPropertyList}
              onChange={setSelectedProperty} />
          </label>}
        {giveChar &&
          <label>
            Choose
            <br />
            <Select
              className="select-char"
              isClearable={isClearable}
              name="chars"
              options={chars}
              onChange={setSelectedChar} />
          </label>}
        {givePropertyName &&
          <label>
            Give property value
            <input type="text" required placeholder="property value.." value={givenInput} onChange={(e) => setGivenInput(e.target.value)} />
          </label>}
        <br />
        {readySubmit &&
          <input type="submit" value="add" />
        }
      </form>
    </div>
  )
}

export default AddNode;
