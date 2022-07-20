const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/data", require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
