const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/tasks.json");

function readTasks() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}


router.get("/", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});


router.post("/", (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const tasks = readTasks();
  const newTask = {
    id: uuidv4(),
    title,
    description: description || "",
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});


router.put("/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const { title, description, dueDate } = req.body;
  tasks[index] = { ...tasks[index], title, description, dueDate };
  writeTasks(tasks);
  res.json(tasks[index]);
});

router.patch("/:id/toggle", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks[index].completed = !tasks[index].completed;
  writeTasks(tasks);
  res.json(tasks[index]);
});

router.delete("/:id", (req, res) => {
  let tasks = readTasks();
  tasks = tasks.filter((t) => t.id !== req.params.id);
  writeTasks(tasks);
  res.json({ message: "Deleted" });
});

module.exports = router;