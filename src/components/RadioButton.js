/*  Reusable Radio button component for forms. 
 */

const RadioButton = ({ label, value, onChange }) => {


  return (
    <div className="radiobutton">
      <label>
        <input type="radio" checked={value} onChange={onChange} />
        {label}
      </label>
    </div>
  )
}

export default RadioButton;