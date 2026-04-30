import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import authRoutes from "./routes/auth.js";

app.use("/auth", authRoutes);
import taskRoutes from "./routes/task.js";

app.use("/tasks", taskRoutes);
import projectRoutes from "./routes/project.js";

app.use("/projects", projectRoutes);