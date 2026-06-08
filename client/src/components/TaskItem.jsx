import React from "react";
function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  return new Date(task.dueDate) < new Date(new Date().toDateString());
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const overdue = isOverdue(task);
  return (
    <div className={`task-item ${overdue ? "overdue" : ""} ${task.completed ? "completed-task" : ""}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && <div className="task-desc">{task.description}</div>}
        <div className="task-meta">
          {task.dueDate && <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>}
          {overdue && <span className="overdue-badge">⚠ Overdue</span>}
          {task.completed && <span className="done-badge">✓ Done</span>}
        </div>
      </div>
      <div className="task-actions">
        <button className="icon-btn" onClick={() => onEdit(task)}>Edit</button>
        <button className="icon-btn delete" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}