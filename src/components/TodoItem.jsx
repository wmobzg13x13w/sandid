import React, { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className='todo-item'>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="edit-input"
          autoFocus
        />
      ) : (
        <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
      )}
      
      {isEditing ? (
        <>
          <button onClick={handleEdit}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TodoItem;