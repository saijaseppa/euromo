

const Button = ({disabled, buttonType, openNodeOrEdgeAdding}) => {

  const openAddNodeOrEdge = () => {
    console.log(`open add ${buttonType}`);
    openNodeOrEdgeAdding(buttonType);
    }

  return (
    <button disabled={disabled} onClick={openAddNodeOrEdge}>
      Add {buttonType}
    </button>
  )
}

export default Button;

/*
      <div>
        {node} {property} {char} {propertyValue}
      </div>
      <div>
        {edge}
      </div>
      <div>

      </div>*/