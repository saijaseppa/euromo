import { Link } from "react-router-dom";
import Logo from "./components/Logo";


const NotFound = () => {

  return (
    <div>
      < Logo />
      <br />
      <h2>Nothing here</h2>
      <p>
        <Link to="/">Click here to get Neo4j visualization</Link>
      </p>
    </div>
  )
}

export default NotFound;