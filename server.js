require("dotenv").config();
const express = require("express");
const connectDB = require("./connectDB");
const app=express();

app.use(express.json());
const { notFound, errorHandler } = require("./src/middleware/errorHandler");


// Routes
const reviewRoutes = require("./src/routes/reviewRoutes");
app.use("/reviews", reviewRoutes);

app.use(notFound);

// Global error handler
app.use(errorHandler);
connectDB()
  .then(() => {
    app.listen(3000, () => {
  console.log("server is running on port 3000");
});
  })
  .catch((err) => {
    console.log("database connection error", err);
  });