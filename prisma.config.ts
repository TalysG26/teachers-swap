import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";
import path from "path";

// 🧩 Carrega manualmente o .env da raiz
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!, // ✅ agora lê direto do dotenv
  },
});
