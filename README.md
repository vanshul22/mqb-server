# Magic Query Builder

## Overview

Magic Query Builder is a full-stack application built using the MERN stack (MongoDB, Express, React, and Node.js). It provides a solid foundation for building and managing queries with a user-friendly interface.

## Requirements

For development, you will need Node.js, npm, and Yarn installed in your environment.

### Node.js

- #### Node installation on Windows

  Download and install Node.js from the [official Node.js website](https://nodejs.org/). Ensure that `git` is available in your PATH.

- #### Node installation on Ubuntu

  Install Node.js and npm using apt:

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems

  Follow the instructions on the [official Node.js website](https://nodejs.org/) and [official NPM website](https://npmjs.org/) for installation.

  Verify the installation:

      $ node --version
      v14.17.0

      $ npm --version
      6.14.13

  If needed, update `npm`:

      $ npm install npm -g

### App installation

Install App after Node.js installation:

    > npm install


## Configure app

Create a `.env` file in the project root and configure the following settings:

- `MONGO_URI`: MongoDB connection URI
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: PORT number for connection

## Running the project

Start the project with:

    $ npm start


## Project Structure

### Entry Point

- `app.js`: Entry point of the application.

### Routes

- `routes/`: Folder containing all route definitions.

### Models

- `models/`: Folder containing all database models.

### Middleware

- `middleware/`: Folder containing authentication middleware (`auth.js`) to check the token of every request.

### Controllers

- `controllers/`: Folder containing logic for all defined routes.

### Config

- `config/`: Folder containing database configuration (`db.js`).

---

Feel free to explore and modify the project based on your specific requirements. Magic Query Builder simplifies the process of building and managing queries, providing a user-friendly experience across the entire MERN stack.
