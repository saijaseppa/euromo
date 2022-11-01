import { useState } from "react";

const SubstringForm = ({ searchSubstring }) => {

  const [selectedWord, setSelectedWord] = useState('');

  const handleSubmit = (e, word) => {
    e.preventDefault();
    searchSubstring(word);
    setSelectedWord('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, selectedWord)}>
      <h4>Search with part of the word</h4>
      <label>
        Give name/part of the name:
        <br />
        <input
          type="text"
          value={selectedWord}
          onChange={(e) => setSelectedWord(e.target.value)} />
      </label>
      <br />
      <input type="submit" value="Search" />
    </form>
  )
}

export default SubstringForm;