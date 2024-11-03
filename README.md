# AdminPro - Backend

This is a backend server for the project AdminPro

1. Clone the project using `git clone`
2. Run `npm install` to install the dependencies
3. Edit .env file with your own environment variables
4. Run `npm run start:dev` to start the server

## Available Endpoints

### Auth

- POST /api/login - **Login a user**

### Users

- GET /api/users - **Get all users (JWT required)**
- GET /api/users/:id - **Get a user by id (JWT required)**
- POST /api/users - **Create a new user**
- PUT /api/users/:id - **Update a user (JWT required)**
- DELETE /api/users/:id - **Delete a user (JWT required)**
