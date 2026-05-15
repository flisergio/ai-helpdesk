import { prisma } from "../src/prisma";
import { Role } from "../src/generated/prisma/client";
import { hashPassword } from "better-auth/crypto";

const email = process.env.SEED_ADMIN_EMAIL;
const password = process.env.SEED_ADMIN_PASSWORD;

if (!email || !password) {
  console.error("SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set");
  process.exit(1);
}

console.log("Wiping existing data...");
await prisma.session.deleteMany();
await prisma.account.deleteMany();
await prisma.verification.deleteMany();
await prisma.user.deleteMany();

console.log("Creating admin user...");
const hashedPassword = await hashPassword(password);
const userId = crypto.randomUUID();

await prisma.user.create({
  data: {
    id: userId,
    name: "Admin",
    email,
    role: Role.admin,
    emailVerified: true,
  },
});

await prisma.account.create({
  data: {
    id: crypto.randomUUID(),
    userId,
    accountId: userId,
    providerId: "credential",
    password: hashedPassword,
  },
});

console.log(`Admin user seeded: ${email}`);
await prisma.$disconnect();
