import React from "react";
export default function Stats({ tasks }) {
  const active = tasks.filter((t) => !t.completed).length;
  const completed = tasks.filter((t) => t.completed).length;
  return (
    <div className="stats">
      <div className="stat-pill">Active: <span>{active}</span></div>
      <div className="stat-pill">Completed: <span>{completed}</span></div>
      <div className="stat-pill">Total: <span>{tasks.length}</span></div>
    </div>
  );
}