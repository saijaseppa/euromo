import Select from 'react-select';
import { useEffect, useState } from "react";

const AddEdge = ({ addEdge }) => {
  //Array of edge types 
  const edges = [
    {value: "FROM", label: "FROM"},
    {value: "OWNS", label: "OWNS"}
  ];

  const [chooseEdge, setChooseEdge] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);

  //When edge is selected, user can submit form 
  //and continue to add other node. 
  useEffect(() => {
    if (selectedEdge) {
      setChooseEdge(true);
    }
  }, [selectedEdge])

  const handleSubmit = (e) => {
    e.preventDefault();
    addEdge(selectedEdge.value);
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
      <label>
          Add edge
          <br />
          <Select
            className="select-edge"
            classNamePrefix="select"
            isClearable={true}
            name="nodeTypes"
            options={edges}
            onChange={setSelectedEdge} />
        </label>
        {chooseEdge &&
          <input type="submit" value="add" />
        }
      </form>
    </div>
  )
}

export default AddEdge;