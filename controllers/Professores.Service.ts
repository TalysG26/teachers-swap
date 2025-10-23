import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProfessoresService { // Nome da classe corrigido
    
    // Método para criar um professor
    async create(dadosProfessor: any) { // 'create' é um método assíncrono que recebe dados
        return await prisma.professor.create({
            data: dadosProfessor, // A operação 'create' do Prisma recebe um objeto com a chave 'data'
        });
    }

    // Exemplo de outro método GET para listar professores
    async findAll() {
        return await prisma.professor.findMany();
    }
}
