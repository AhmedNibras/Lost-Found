import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import itemRouter from "./routes/item.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/users", userRouter); // http://localhost:5000/users/signup
// For item
app.use("/items", itemRouter); // http://localhost:5000/items

// Url of MongoDb
const MONGODB_URL =
  "mongodb+srv://ahmednibras:nopassword@---.jreoxuc.mongodb.net/---?retryWrites=true&w=majority";

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Port
const PORT = 5000 || process.env.PORT;

// Connect to MongoDb and start server
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
