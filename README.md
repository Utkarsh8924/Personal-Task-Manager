# Personal-Task-Manager
A full-stack task management application built as part of the Studio Graphene front-end engineering assessment. The app allows a single user to create, view, update, and delete personal tasks — no authentication required. Tasks support titles, optional descriptions, and due dates, and can be filtered by status (All / Active / Completed). Overdue tasks are visually highlighted, and all data is persisted to a JSON file on the server so tasks survive restarts.


Not deployed — runs locally only. See "How to Run Locally" below.


Tech Stack
Frontend
ToolWhyReact 18Component-based UI, fast re-renders, industry standardViteInstant dev server, zero-config HMR, much faster than CRAAxiosCleaner API calls than native fetch, automatic JSON parsingCSS VariablesTheming and consistent design tokens without a CSS framework
Backend
ToolWhyNode.js + ExpressMinimal setup, easy REST API, great ecosystemUUIDGenerates unique IDs for tasks without a databaseCORSAllows the React frontend (port 5173) to talk to the API (port 5000)fs (built-in)Reads and writes tasks.json for persistence — no database setup needed

How to Run Locally

Prerequisites: Node.js installed (v18 or higher). Nothing else needed.

1. Clone the repository
bashgit clone <your-repo-url>
cd task-manager
2. Start the backend
bashcd server
npm install
npm run dev
Server runs at: http://localhost:5000
3. Start the frontend (open a new terminal tab)
bashcd client
npm install
npm run dev
App runs at: http://localhost:5173
Open http://localhost:5173 in your browser. Both terminals must stay running.

API Documentation
Base URL: http://localhost:5000/api
All request and response bodies are JSON.

GET /tasks
Fetch all tasks.
Request body: none
Response:
json[
  {
    "id": "uuid",
    "title": "Learn React",
    "description": "Practice hooks and state",
    "dueDate": "2026-06-15",
    "completed": false,
    "createdAt": "2026-06-08T10:00:00.000Z"
  }
]

POST /tasks
Create a new task.
Request body:
json{
  "title": "Learn React",
  "description": "Practice hooks and state",
  "dueDate": "2026-06-15"
}

title is required. description and dueDate are optional.

Response: 201 Created — the newly created task object.
json{
  "id": "uuid",
  "title": "Learn React",
  "description": "Practice hooks and state",
  "dueDate": "2026-06-15",
  "completed": false,
  "createdAt": "2026-06-08T10:00:00.000Z"
}

PUT /tasks/:id
Update a task's title, description, or due date.
URL param: id — the task's UUID
Request body:
json{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2026-07-01"
}
Response: 200 OK — the updated task object.

PATCH /tasks/:id/toggle
Toggle a task's completed status between true and false.
URL param: id — the task's UUID
Request body: none
Response: 200 OK — the updated task object with the new completed value.

DELETE /tasks/:id
Delete a task permanently.
URL param: id — the task's UUID
Request body: none
Response:
json{ "message": "Deleted" }

Project Structure
task-manager/
│
├── client/                   # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx  # Add / edit task form
│   │   │   ├── TaskList.jsx  # Renders the list of tasks
│   │   │   ├── TaskItem.jsx  # Single task card with actions
│   │   │   ├── FilterBar.jsx # All / Active / Completed tabs
│   │   │   └── Stats.jsx     # Active vs completed count pills
│   │   ├── services/
│   │   │   └── api.js        # Axios instance + API call functions
│   │   ├── App.jsx           # Root component, state, handlers
│   │   ├── App.css           # All styles (CSS variables, dark theme)
│   │   └── main.jsx          # React DOM entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                   # Express backend
│   ├── routes/
│   │   └── taskRoutes.js     # All /api/tasks route handlers
│   ├── data/
│   │   └── tasks.json        # Flat-file persistence (auto-created)
│   ├── server.js             # Express app setup, middleware, port
│   └── package.json
│
└── README.md
