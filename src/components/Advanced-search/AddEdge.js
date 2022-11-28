import Select from 'react-select';
import { useEffect, useState } from "react";

const AddEdge = ({ addEdge }) => {

  const edges = [
    {value: "FROM", label: "FROM"},
    {value: "OWNS", label: "OWNS"}
  ];
  const [isClearable, setIsClearable] = useState(true);
  const [chooseEdge, setChooseEdge] = useState(false);

  const [selectedEdge, setSelectedEdge] = useState(null);

  useEffect(() => {
    if (selectedEdge) {
      setChooseEdge(true);
    }
  }, [selectedEdge])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('add edge', selectedEdge);
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
            isClearable={isClearable}
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