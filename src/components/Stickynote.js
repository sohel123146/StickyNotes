import React, { useState } from "react";
import Stickynoteitem from "./Stickynoteitem";

const Stickynote = () => {
  const [text, setText] = useState("");
  const [sNote, setSNote] = useState([]);


  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 0) {
      setSNote([...sNote, text]);
      setText("");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center my-3">
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Add Item..."
            onChange={onChange}
            value={text}
          />
          <button
            type="submit"
            disabled={text.length === 0}
            className="btn btn-primary"
          >
            Add
          </button>
        </form>
      </div>
      <div className="d-flex align-items-center justify-content-center my-3">
        <ul className="list-group">
          {sNote.map((item, index) => (
            <Stickynoteitem 
            text={item} 
            key={index} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Stickynote;
