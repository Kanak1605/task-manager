import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";   // ✅ ADD THIS
import taskRoutes from "./routes/task.js";   // (if using)
import projectRoutes from "./routes/project.js"; // (if using)

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("Server is LIVE 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});