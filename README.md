# Task Manager Frontend

## Description
Task Manager is a web-based application that allows users to manage their tasks efficiently. It provides user authentication, task creation, updating, deletion, and status tracking. This frontend is built using **React.js** and communicates with the Task Manager API.

## Features
- User authentication (Login & Registration)
- Create, edit, delete, and mark tasks as complete
- Responsive UI built with React.js
- API integration with backend services
- State management using React Hooks
- Error handling and form validation

## Tech Stack
- **React.js** - Frontend framework
- **Axios** - HTTP client for API requests
- **React Router** - Navigation handling
- **Tailwind CSS** - Styling framework
- **Context API** - State management

## Installation

### Prerequisites
- Node.js installed (latest LTS recommended)
- Backend Task Manager API running

### Steps to Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```sh
   npm start
   ```

## Project Structure
```
/task-manager-frontend
│── /src
│   ├── /components
│   │   ├── TaskList.js
│   │   ├── TaskItem.js
│   ├── /pages
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   ├── /context
│   │   ├── AuthContext.js
│   ├── App.js
│   ├── index.js
│── .env (not included in repo)
│── package.json
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production

## API Endpoints Used
This frontend interacts with the **Task Manager API**:

### Authentication Routes
| Method | Endpoint       | Description             |
|--------|--------------|-------------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Authenticate user and get token |

### Task Routes (Protected)
| Method | Endpoint       | Description             |
|--------|--------------|-------------------------|
| GET    | `/api/tasks`  | Get all tasks for the authenticated user |
| POST   | `/api/tasks`  | Create a new task |
| PUT    | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Deployment
To deploy the project, build the application and serve it using **Vercel, Netlify, or Firebase Hosting**:
```sh
npm run build
```

## License
This project is licensed under the MIT License.

## Author
[Your Name]
