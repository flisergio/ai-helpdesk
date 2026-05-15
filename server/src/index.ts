import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { prisma } from "./prisma";

const app = express();
const port = process.env.PORT || 3001;

app.all("/api/auth/{*splat}", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
