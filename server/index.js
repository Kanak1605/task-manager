import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS here (VERY IMPORTANT POSITION)
app.use(
  cors({
    origin: "https://task-manager-phi-gules-93.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Server is LIVE 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});