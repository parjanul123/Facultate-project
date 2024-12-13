// routes/db.js
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  port: 3307,
  user: "my_user",
  password: "my_password",
  database: "my_database",
  ssl: { rejectUnauthorized: false },
};

let connection;

async function connectToDatabase() {
  if (!connection) {
    try {
      connection = await mysql.createConnection(dbConfig);
      console.log("Connected to MySQL database.");

      // Create the users table if it doesn't exist
      const createUsersTableQuery = `
          CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
          );
        `;
      await connection.execute(createUsersTableQuery);
      console.log("Users table is ready.");

      // Create the cart table if it doesn't exist
      const createCartTableQuery = `
          CREATE TABLE IF NOT EXISTS cart (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
          );
        `;
      await connection.execute(createCartTableQuery);
      console.log("Cart table is ready.");
    } catch (error) {
      console.error("Error connecting to MySQL database:", error);
    }
  }
  return connection;
}

module.exports = { connectToDatabase };