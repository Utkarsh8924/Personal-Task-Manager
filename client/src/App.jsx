import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import Stats from "./components/Stats";
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError(null);
      const res = await getTasks();
      setTasks(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      setError("Could not connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data) {
    try {
      if (editTask) {
        await updateTask(editTask.id, data);
        setEditTask(null);
      } else {
        await createTask(data);
      }
      loadTasks();
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  }

  async function handleToggle(id) {
    await toggleTask(id);
    loadTasks();
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(id);
    loadTasks();
  }

  function handleEdit(task) {
    setEditTask(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditTask(null);
  }

  const filtered = tasks
    .filter((t) =>
      filter === "All" ? true : filter === "Active" ? !t.completed : t.completed
    )
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="app">

      {}
      <div className="app-header">
        <h1>Task Manager</h1>
        <p className="subtitle">Stay on top of your work</p>
      </div>

      {}
      {error && (
        <div className="error-banner">
          ⚠ {error}
        </div>
      )}

      {}
      <TaskForm
        onSubmit={handleSubmit}
        editTask={editTask}
        onCancel={handleCancelEdit}
      />

      {}
      <Stats tasks={tasks} />

      {}
      <input
        className="search-input"
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {}
      <FilterBar current={filter} onChange={setFilter} />

      {}
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <TaskList
          tasks={filtered}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

    </div>
  );
}