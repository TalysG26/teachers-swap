import { PrismaClient } from "@prisma/client";

 const PrismaClientSingleton = () => {
    return new PrismaClient();
 }

 type PrismaClientType = ReturnType<typeof PrismaClientSingleton>;

 const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientType | undefined;
 }

 const prisma = globalForPrisma.prisma ?? PrismaClientSingleton();

 export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;