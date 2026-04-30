import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
import authRoutes from "./routes/auth.js";

app.use("/auth", authRoutes);
import taskRoutes from "./routes/task.js";

app.use("/tasks", taskRoutes);
import projectRoutes from "./routes/project.js";

app.use("/projects", projectRoutes);