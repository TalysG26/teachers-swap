import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProfessoresService { 
    
    // Método para criar um professor
    async create(dadosProfessor: any) { // 'create' é um método assíncrono que recebe dados
        return await prisma.professor.create({
            data: dadosProfessor, 
        });
    }   
    async findAll() {
        return await prisma.professor.findMany();
    }
}
