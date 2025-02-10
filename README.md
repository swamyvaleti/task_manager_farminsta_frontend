# Task Manager Backend

RESTful API for the Task Manager application built with Node.js, Express, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for tasks
- MongoDB integration
- Protected routes
- Input validation
- Error handling

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks (protected)
- POST `/api/tasks` - Create a new task (protected)
- PUT `/api/tasks/:id` - Update a task (protected)
- DELETE `/api/tasks/:id` - Delete a task (protected)

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `PORT`: Server port (default: 5000)
- `CORS_ORIGIN`: Allowed origin for CORS

## Available Scripts

- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- cors for CORS handling