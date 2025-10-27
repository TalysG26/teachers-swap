import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
    socialProviders: {
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    },
    plugins:[ nextCookies()]
})

    