import React, { useState, useEffect } from "react";
import pin from "../Assests/pin.svg";

const Stickynoteitem = ({ text }) => {
  const [position, setPosition] = useState({ left: "100", top: "100" });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffest] = useState({ offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const savedPosition = localStorage.getItem(`StickyNotePosition-${text}`);
    if (savedPosition) {
      const positionObject = JSON.parse(savedPosition);
      setPosition(positionObject);
    }
  }, [text]);

  useEffect(() => {
    localStorage.setItem(
      `StickyNotePosition-${text}`,
      JSON.stringify(position)
    );
  }, [position, text]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;
    setOffest({ offsetX, offsetY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const left = e.clientX - offset.offsetX;
      const top = e.clientY - offset.offsetY;
      setPosition({ left, top });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: "300px",
        height: "100px",
        backgroundColor: "#f1ee8e",
        position: "absolute",
        left: `${position.left}px`,
        top: `${position.top}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="sticky-items d-flex"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={pin}
        style={{ backgroundColor: "#f1ee8e" }}
        height="30px"
        alt="img"
      />
      <h4>{text}</h4>
    </div>
  );
};

export default Stickynoteitem;
