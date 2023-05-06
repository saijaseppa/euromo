import Select from 'react-select';
import { useEffect, useState } from "react";

const AddEdge = ({ addEdge }) => {
  //Array of edge types 
  const edges = [
    { value: "FROM", label: "FROM" },
    { value: "OWNS", label: "OWNS" },
  ];

  const [chooseEdge, setChooseEdge] = useState(false);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [showCheckInverse, setShowCheckInverse] = useState(false);
  const [showCheckRelationships, setShowCheckRelationships] = useState(false);
  const [checkedInv, setCheckedInv] = useState(false);
  const [checkedRel, setCheckedRel] = useState(false);

  // When edge is selected, user can submit form 
  // and continue to add other node. 
  useEffect(() => {
    if (selectedEdge) {
      if (selectedEdge.value === "OWNS") {
        setShowCheckInverse(true);
        setShowCheckRelationships(true);
      }
      else {
        setShowCheckInverse(true);
        setShowCheckRelationships(false);
      }
      setChooseEdge(true);
    }
  }, [selectedEdge]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEdge(selectedEdge.value, checkedInv, checkedRel);
  }

  const handleCheckInv = () => {
    setCheckedInv(!checkedInv);
  }

  const handleCheckRel = () => {
    setCheckedRel(!checkedRel);
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
        {showCheckInverse &&
          <>
            <label>
              <input type="checkbox" checked={checkedInv} onChange={handleCheckInv} />
              inverse
            </label>
            <br />
          </>
        }
        {showCheckRelationships &&
          <>
            <label>
              <input type="checkbox" checked={checkedRel} onChange={handleCheckRel} />
              all relationships
            </label>
            <br />
          </>
        }
        {chooseEdge &&
          <input type="submit" value="add" />
        }
      </form>
    </div>
  )
}

export default AddEdge;