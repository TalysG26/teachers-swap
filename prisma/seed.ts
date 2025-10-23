
//chatgpt mesmo 
import * as dotenv from "dotenv";
import path from "path";

// 🗂️ Carrega o .env da raiz do projeto
dotenv.config({ path: path.resolve(process.cwd(), ".env") });


import { PrismaClient, StatusAula, StatusSolicitacao } from "@/app/generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Eu
  const prof1 = await prisma.professor.create({
    data: {
      nome: "David Lima",
      email: "dhs.lima@ifal.edu.br",
      senha: "123456",
      formularioReposicao: true,
    },
  });

  const prof2 = await prisma.professor.create({
    data: {
    nome: "Thiago Silva" ,
      email: "thiago.Silva@ifal.edu.br",
      senha: "232442",
      formularioReposicao: false,
    },
  });

  
  const aula1 = await prisma.aula.create({
    data: {
      data: new Date("2025-10-25"),
      horario: "9:00 - 11:50",
      status: StatusAula.ATIVA,
      professorId: prof1.id,
    },
  });

  const aula2 = await prisma.aula.create({
    data: {
      data: new Date("2025-10-05"),
      horario: "12:00 - 14:00",
      status: StatusAula.DISPONIVEL,
      professorId: prof2.id,
    },
  });

  
  await prisma.solicitacaoReposicao.create({
    data: {
      aulaId: aula1.id,
      professorOriginalId: prof1.id,
      professorInteressadoId: prof2.id,
      status: StatusSolicitacao.PENDENTE,
    },
  });

  await prisma.solicitacaoReposicao.create({
    data: {
      aulaId: aula2.id,
      professorOriginalId: prof2.id,
      status: StatusSolicitacao.PENDENTE,
    },
  });

  console.log("Essa poha está funcionando, então não mexe!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
