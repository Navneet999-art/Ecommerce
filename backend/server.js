const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");

//Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDB();

app.use(express.json());
app.use(cookieParser());

//route imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1", order);
//Middleware for error
app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`server is running at port ...${PORT}`));
