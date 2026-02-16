require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// Import routes
const itemRoutes = require("./routes/itemRoutes");

// Use routes
app.use("/api/items", itemRoutes);


app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Flutter API is running" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const { MONGODB_URI, PORT } = process.env;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const port = Number(PORT) || 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
