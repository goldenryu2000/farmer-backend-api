const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const { version } = require("./package.json");
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Farmer Data API",
      description: "An API made for the task by SyncSense",
      version,
    },
  },
  apis: ["./routes/*Routes.js", "./models/*Model.js"],
};

const swaggerSpec = swaggerJsDoc(options);
app.use("/api", require("./routes/farmerRoutes"));

app.use(errorHandler);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.listen(port, () => console.log(`Server started on port ${port}`));
