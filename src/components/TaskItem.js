import React, { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(task.id, editedTitle, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)} type="button">
            Cancel
          </button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  onDelete(task.id);
                }
              }}
            >
              🗑 Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
