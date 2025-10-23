import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const envPath = path.resolve(process.cwd(), ".env");
console.log("🗂️ Caminho do .env:", envPath);
console.log("📦 Existe:", fs.existsSync(envPath));

dotenv.config({ path: envPath });
console.log("🔍 Valor de DATABASE_URL:", process.env.DATABASE_URL || "❌ NÃO ENCONTRADO");
