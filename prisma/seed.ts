import * as dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@/app/generated/prisma/client";


dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed");

  
  const statusAula = await prisma.statusAulaDB.createMany({
    data: [
      { nome: "ATIVA" },
      { nome: "DISPONIVEL" },
      { nome: "REPOSTA" },
      { nome: "CANCELADA" },
    ],
    skipDuplicates: true,
  });

  
  const statusSolicitacao = await prisma.statusSolicitacaoDB.createMany({
    data: [
      { nome: "PENDENTE" },
      { nome: "ACEITA" },
      { nome: "RECUSADA" },
    ],
    skipDuplicates: true,
  });

  
  const statusAtiva = await prisma.statusAulaDB.findFirst({ where: { nome: "ATIVA" } });
  const statusDisponivel = await prisma.statusAulaDB.findFirst({ where: { nome: "DISPONIVEL" } });
  const statusPendente = await prisma.statusSolicitacaoDB.findFirst({ where: { nome: "PENDENTE" } });

  
  const prof1 = await prisma.professor.create({
    data: {
      id: 1,
      nome: "David Lima",
      email: "dhs.lima@ifal.edu.br",
      senha: "123456",
      formularioReposicao: true,
    },
  });

  const prof2 = await prisma.professor.create({
    data: {
      nome: "Thiago Silva",
      email: "thiago.silva@ifal.edu.br",
      senha: "232442",
      formularioReposicao: false,
    },
  });


  const aula1 = await prisma.aula.create({
    data: {
      data: new Date("2025-10-25"),
      horario: "9:00 - 11:50",
      statusId: statusAtiva!.id,
      professorId: prof1.id,
    },
  });

  const aula2 = await prisma.aula.create({
    data: {
      data: new Date("2025-10-05"),
      horario: "12:00 - 14:00",
      statusId: statusDisponivel!.id,
      professorId: prof2.id,
    },
  });

  
  await prisma.solicitacaoReposicao.create({
    data: {
      aulaId: aula1.id,
      professorOriginalId: prof1.id,
      professorInteressadoId: prof2.id,
      statusId: statusPendente!.id,
    },
  });

  await prisma.solicitacaoReposicao.create({
    data: {
      aulaId: aula2.id,
      professorOriginalId: prof2.id,
      statusId: statusPendente!.id,
    },
  });

  console.log("essa poha está funcionado, não mexe!");
}

main()
  .catch((e) => {
    console.error("fudeu deu erro:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Conexão encerrada.");
  });