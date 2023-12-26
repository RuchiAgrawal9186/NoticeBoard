// import React, { useRef, useState } from 'react'

// const NoticeCard = ({onClose}) => {
//     const [allowMove, setAllowMove] = useState(false)
//     const stickyNoteRef = useRef()

//     const [dx, setDx] = useState(0)
//     const [dy, setDy] = useState(0)

//     function handleMouseDown(e) {
//         setAllowMove(true)
//         const dimensions = stickyNoteRef.current.getBoundingClientRect()
//         setDx(e.clientX - dimensions.x)
//         setDy(e.clientY - dimensions.y)
//     }
//     function handleMouseMove(e) {
//         if (allowMove) {
//             // move the sticky note
//             console.log("allow moving - ", e.clientX, dx, e.clientY, dy)
//             const x = e.clientX - dx
//             const y = e.clientY - dy
//             console.log("inside mouse move", x, y)
//             stickyNoteRef.current.style.left = x + "px"
//             stickyNoteRef.current.style.top = y + "px"
//         }
//     }
//     function handleMouseUp() {
//         setAllowMove(false)
//     }

//   return (
//     <div className='newscard' ref={stickyNoteRef}
//     onMouseDown={handleMouseDown}
//     onMouseMove={handleMouseMove}
//     onMouseUp={handleMouseUp}>

//         <div className='header'>
//             <div>Notice</div>
//             <div className='close' onClick={onClose} >&times;</div>
//         </div>
//         <textarea name="" id="" cols="30" rows="10"
//         placeholder='Type....'
//        ></textarea>

//         <button >edit</button>
//         <button >Save</button>
//     </div>
//   )
// }

// export default NoticeCard

import React, { useRef, useState } from "react";

const NoticeCard = ({ onClose, onSave, noteId }) => {
  const [allowMove, setAllowMove] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const stickyNoteRef = useRef();

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  function handleMouseDown(e) {
    setAllowMove(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setDx(e.clientX - dimensions.x);
    setDy(e.clientY - dimensions.y);
  }

  function handleMouseMove(e) {
    if (allowMove) {
      // move the sticky note
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = x + "px";
      stickyNoteRef.current.style.top = y + "px";
    }
  }

  function handleMouseUp() {
    setAllowMove(false);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(noteId, noteContent); // Trigger the save operation
  };

  const handleTextareaChange = (e) => {
    setNoteContent(e.target.value);
  };

  return (
    <div
      className={`newscard ${isEditing ? "editing" : ""}`}
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
          onChange={handleTextareaChange}
        ></textarea>
      ) : (
        <div className="content">{noteContent}</div>
      )}

      <div className="actions">
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
