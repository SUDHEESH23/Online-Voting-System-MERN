﻿# MERN-Online-Voting-System

This project is a web-based voting application built with React for the frontend and Node.js with MongoDB for the backend. It allows users to view candidates, vote for them, and displays real-time updates to the vote count. This README provides an overview of the project structure, features, technologies used, and how to contribute.

## Features

- **Authentication**: Users can register, login, and securely authenticate using JWT tokens.
- **Candidate Management**: Admins can add, view, and manage candidates.
- **Voting**: Users can vote for their preferred candidates, with real-time vote count updates.
- **Responsive Design**: Built using Bootstrap for a responsive and mobile-friendly UI.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine.
- MongoDB installed and running locally or accessible via a remote server.
- A web browser that supports modern JavaScript and ES6 features.

## Folder Structure

The project structure is organized as follows:

- **`server/`**: Contains the Node.js backend code.
  - `server.js`: Entry point for the backend server.
  - `routes/`: Contains route handlers for authentication, candidates, and votes.
  - `models/`: Defines MongoDB schemas and models.
  - `controllers/`: Implements business logic for CRUD operations.
  - `middlewares/`: Contains authentication middleware.
- **`client/`**: Contains the React frontend code.
  - `src/`: Contains components, pages, and services used in the frontend.
  - `public/`: Contains static assets and `index.html`.

## Usage

- **Register/Login**: Users can register for a new account or login with existing credentials.
- **View Candidates**: Users can view a list of candidates and their respective parties.
- **Vote**: Users can vote for their preferred candidates, with the option to view real-time updates to vote counts.

## Technologies Used

- **Frontend**: React, React Router, Axios, Bootstrap
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Bootstrap CSS framework

## Contributing

Contributions are welcome! To contribute to this project, please fork the repository, create your feature branch, commit your changes, and submit a pull request.
