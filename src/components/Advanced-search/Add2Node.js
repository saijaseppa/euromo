import Select from 'react-select';
import { useEffect, useState } from "react";

const Add2Node = ({ add2node }) => {


  const nodeTypes = [
    { value: "Person", label: "Person owner" },
    { value: "Outlet", label: "Outlet" },
    { value: "Legal_owner", label: "Legal owner" },
    { value: "Country", label: "Country" },
    { value: "any node", label: "*" }
  ];

  const CountryPropertyList = [{ value: "Name", label: "Country name" }];

  const PersonPropertyList = [{ value: "Name", label: "Name" }]
  const OutletPropertyList = [{ value: "Name", label: "Name" }]
  const Legal_ownerPropertyList = [{ value: "Name", label: "Name" }]

  const chars = [{ value: "=", label: "=" }, { value: "<", label: "<" }, { value: ">", label: ">" }]


  const [isClearable, setIsClearable] = useState(true);
  const [readySubmit, setReadySubmit] = useState(false);
  const [chooseProperties, setChooseProperties] = useState(false);
  const [givePropertyName, setGivePropertyName] = useState(false);
  const [giveChar, setGiveChar] = useState(false);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedPropertyList, setSelectedPropertyList] = useState(null);
  const [selectedChar, setSelectedChar] = useState('');
  const [givenInput, setGivenInput] = useState('');

  useEffect(() => {
    if (selectedNode) {
      if (selectedNode.value === "Country") {
        setSelectedPropertyList(CountryPropertyList);
        setChooseProperties(true);
      }
      if (selectedNode.value === "Person") {

      }
      if (selectedNode.value === "Legal_owner") {

      }
      if (selectedNode.value === "Outlet") {

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
    add2node(selectedNode.value, selectedProperty.value, selectedChar.value, givenInput);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Add second node
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
  )
}

export default Add2Node;