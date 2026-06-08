import React from "react";
import { useState, useEffect } from "react";

export default function TaskForm({ onSubmit, editTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setDueDate(editTask.dueDate ? editTask.dueDate.slice(0, 10) : "");
    } else {
      setTitle(""); setDescription(""); setDueDate("");
    }
  }, [editTask]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    onSubmit({ title: title.trim(), description: description.trim(), dueDate });
    setTitle(""); setDescription(""); setDueDate("");
  }

  return (
    <div className="task-form">
      <h2>{editTask ? "✏️ Edit Task" : "➕ New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group" style={{ flex: 2 }}>
            <label>Title *</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>
        <div className="form-group" style={{ marginTop: 10 }}>
          <label>Description</label>
          <textarea
            placeholder="Optional details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editTask ? "Update Task" : "Add Task"}
          </button>
          {editTask && (
            <button type="button" className="btn btn-ghost" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}