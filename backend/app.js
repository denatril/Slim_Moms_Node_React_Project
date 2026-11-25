import express from "express";
import cors from "cors";
import authRouter from "./routes/api/auth.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, _next) => {
  const { status = 500, message = "Server error" } = err;
  if (status >= 500) {
    console.error(err);
    return res.status(status).json({ message: "Server error" });
  }
  res.status(status).json({ message });
});

export default app;
