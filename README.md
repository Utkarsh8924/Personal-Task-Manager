# Personal Task Manager

A full-stack task management application built as part of the Studio Graphene Front-End Engineering Assessment.

The app allows a single user to create, view, update, and delete personal tasks without authentication. Tasks support titles, optional descriptions, and due dates. Users can filter tasks by status (**All**, **Active**, **Completed**), while overdue tasks are visually highlighted. All task data is persisted to a JSON file on the server, ensuring tasks remain available after server restarts.


---

## Features

* Create, edit, and delete tasks
* Mark tasks as completed or active
* Filter tasks by status
* Optional task descriptions and due dates
* Visual highlighting for overdue tasks
* Persistent storage using a JSON file
* Responsive and clean user interface
* No authentication required

---

## Tech Stack

### Frontend

| Tool          | Purpose                                            |
| ------------- | -------------------------------------------------- |
| React 18      | Component-based UI with efficient re-rendering     |
| Vite          | Fast development server with instant HMR           |
| Axios         | Simplified API requests and automatic JSON parsing |
| CSS Variables | Consistent theming and design tokens               |

### Backend

| Tool         | Purpose                                   |
| ------------ | ----------------------------------------- |
| Node.js      | JavaScript runtime                        |
| Express      | Lightweight REST API framework            |
| UUID         | Unique task ID generation                 |
| CORS         | Enables frontend-backend communication    |
| fs (Node.js) | File-based persistence using `tasks.json` |

---

## How to Run Locally

### Prerequisites

* Node.js v18 or higher

### 1. Clone the Repository

```bash
git clone https://github.com/Utkarsh8924/Personal-Task-Manager
cd task-manager
```

### 2. Start the Backend

```bash
cd server
npm install
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 3. Start the Frontend

Open a new terminal window:

```bash
cd client
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

Open the application in your browser:

```text
http://localhost:5173
```

Both frontend and backend terminals must remain running while using the application.

---

## API Documentation

### Base URL

```text
http://localhost:5000/api
```

All requests and responses use JSON.

---

### GET /tasks

Fetch all tasks.

#### Request

```http
GET /api/tasks
```

#### Response

```json
[
  {
    "id": "uuid",
    "title": "Learn React",
    "description": "Practice hooks and state",
    "dueDate": "2026-06-15",
    "completed": false,
    "createdAt": "2026-06-08T10:00:00.000Z"
  }
]
```

---

### POST /tasks

Create a new task.

#### Request

```http
POST /api/tasks
```

```json
{
  "title": "Learn React",
  "description": "Practice hooks and state",
  "dueDate": "2026-06-15"
}
```

**Validation**

* `title` is required
* `description` is optional
* `dueDate` is optional

#### Response

```json
{
  "id": "uuid",
  "title": "Learn React",
  "description": "Practice hooks and state",
  "dueDate": "2026-06-15",
  "completed": false,
  "createdAt": "2026-06-08T10:00:00.000Z"
}
```

---

### PUT /tasks/:id

Update an existing task.

#### Request

```http
PUT /api/tasks/:id
```

```json
{
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2026-07-01"
}
```

#### Response

```json
{
  "id": "uuid",
  "title": "Updated title",
  "description": "Updated description",
  "dueDate": "2026-07-01",
  "completed": false,
  "createdAt": "2026-06-08T10:00:00.000Z"
}
```

---

### PATCH /tasks/:id/toggle

Toggle a task's completion status.

#### Request

```http
PATCH /api/tasks/:id/toggle
```

#### Response

```json
{
  "id": "uuid",
  "title": "Learn React",
  "description": "Practice hooks and state",
  "dueDate": "2026-06-15",
  "completed": true,
  "createdAt": "2026-06-08T10:00:00.000Z"
}
```

---

### DELETE /tasks/:id

Delete a task permanently.

#### Request

```http
DELETE /api/tasks/:id
```

#### Response

```json
{
  "message": "Deleted"
}
```

---

## Project Structure

```text
task-manager/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── Stats.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── data/
│   │   └── tasks.json
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Design Decisions

* **No database dependency**: Task data is stored in a JSON file for simplicity and portability.
* **RESTful API design**: Clear endpoints for CRUD operations.
* **Component-based architecture**: React components are separated by responsibility for maintainability.
* **Client-side filtering**: Improves responsiveness without additional API calls.
* **Persistent storage**: Tasks remain available across server restarts.

---



