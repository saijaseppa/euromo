import { Routes, Route } from "react-router-dom";
import Start from "./Start";
import NotFound from "./NotFound";
import './app.css'

const App = () => {
  // Environment variables to database access 
  const NEO4J_URI = process.env.REACT_APP_NEO4J_URI;
  const NEO4J_USER = process.env.REACT_APP_NEO4J_USER;
  const NEO4J_PASSWORD = process.env.REACT_APP_NEO4J_PASSWORD;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Start uri={NEO4J_URI} user={NEO4J_USER} password={NEO4J_PASSWORD} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
