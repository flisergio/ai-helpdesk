import express from "express";
import { prisma } from "./prisma";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
