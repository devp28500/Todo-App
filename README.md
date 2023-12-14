# Todo Web App

This is a simple Todo web application with a frontend built using React.js and a backend developed using Node.js with Express. PostgreSQL is used as the database to store the Todo items.

## Project Structure

The project is organized into two main folders:

- **client**: Contains the frontend code written in React.js.
- **server**: Contains the backend code written in Node.js with Express.

## Prerequisites

Before running the Todo app, make sure you have the following installed on your machine:

- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/download/)
- Node.js: [Download and Install Node.js](https://nodejs.org/)

## Getting Started

### Frontend

1. Open a terminal and navigate to the `client` folder:

    ```bash
    cd client
    ```

2. Install dependencies using either `yarn` or `npm`:

    ```bash
    # Using yarn
    yarn

    # Using npm
    npm install
    ```

3. Start the frontend application:

    ```bash
    # Using yarn
    yarn start

    # Using npm
    npm start
    ```

### Backend

1. Open another terminal and navigate to the `src/server` folder:

    ```bash
    cd src/server
    ```

2. Go to the `users.js` file to modify PostgreSQL configurations such as database name, port number, user, and password.

3. Install backend dependencies:

    ```bash
    npm install
    ```

4. Start the backend server:

    ```bash
    node server.js
    ```

## Usage

Once both the frontend and backend are running, you can access the Todo app in your browser at `http://localhost:3000`. The app allows you to create, edit, and delete Todo items.

## Technologies Used

- Frontend: React.js
- Backend: Node.js, Express
- Database: PostgreSQL

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Your feedback is highly appreciated.

## License

This Todo web app is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code for your purposes.
