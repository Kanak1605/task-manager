import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MUST HAVE ROOT ROUTE
app.get("/", (req, res) => {
  res.status(200).send("Server is LIVE 🚀");
});

// ✅ health check route (Railway friendly)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
