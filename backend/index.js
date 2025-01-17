// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");
const discordAuthRoutes = require("./routes/discordAuth");
const cfxRedmAuthRoutes = require("./routes/cfxRedmAuth");
const app = express();
const PORT = 3500;

app.use("/api/discord", discordAuthRoutes);
app.use("/api/cfx", cfxRedmAuthRoutes);
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use routes
// Use routes
app.use("/api/cart", cartRoutes);
app.use("/api", authRoutes); // This line means all routes in authRoutes will be prefixed with /api

// Start the server
app.listen(PORT, async () => {
  const { connectToDatabase } = require("./routes/db");
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});
