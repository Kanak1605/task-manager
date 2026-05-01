import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";
import projectRoutes from "./routes/project.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});