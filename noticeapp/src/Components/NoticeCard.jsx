import React, { useRef, useState } from "react";

const NoticeCard = ({ onClose, onSave, noteId }) => {
  const [allowMove, setAllowMove] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const stickyNoteRef = useRef();
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  const handleMouseDown = (e) => {
    setAllowMove(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
  };

  const handleMouseMove = (e) => {
    if (allowMove) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = x + "px";
      stickyNoteRef.current.style.top = y + "px";
    }
  };

  const handleMouseUp = () => {
    setAllowMove(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(noteId, noteContent);
  };

  const handleTextareaChange = (e) => {
    setNoteContent(e.target.value);
  };

  const handlePinToggle = (e) => {
    setIsPinned(true);
  };
  const handleUnpinClick = () => {
    setIsPinned(false);
  };
  return (
    <div
      className={`newscard ${isEditing ? "editing" : ""} ${
        isPinned ? "pinned" : "unpinned"
      }`}
      ref={stickyNoteRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="header">
        <div>Notice</div>
        <div className="close" onClick={onClose}>
          &times;
        </div>
      </div>
      {isEditing ? (
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Type...."
          value={noteContent}
          readOnly={isPinned}
          onChange={handleTextareaChange}
        ></textarea>
      ) : (
        <div className="content">{noteContent}</div>
      )}

      <div className="actions">
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <>
            {isPinned ? (
              <button
                className={`unpin-btn ${isPinned ? "pinned" : ""}`}
                onClick={handleUnpinClick}
              >
                Unpin
              </button>
            ) : (
              <button onClick={handlePinToggle} className="pinned">
                Pin
              </button>
            )}

            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
