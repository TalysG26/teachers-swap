-- CreateEnum
CREATE TYPE "StatusAula" AS ENUM ('ATIVA', 'DISPONIVEL', 'REPOSTA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusSolicitacao" AS ENUM ('PENDENTE', 'ACEITA', 'RECUSADA');

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "formularioReposicao" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "status" "StatusAula" NOT NULL DEFAULT 'ATIVA',
    "observacao" TEXT,
    "professorId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolicitacaoReposicao" (
    "id" SERIAL NOT NULL,
    "aulaId" INTEGER NOT NULL,
    "professorOriginalId" INTEGER NOT NULL,
    "professorInteressadoId" INTEGER,
    "status" "StatusSolicitacao" NOT NULL DEFAULT 'PENDENTE',
    "dataSolicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SolicitacaoReposicao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoReposicao" ADD CONSTRAINT "SolicitacaoReposicao_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "Aula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoReposicao" ADD CONSTRAINT "SolicitacaoReposicao_professorOriginalId_fkey" FOREIGN KEY ("professorOriginalId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoReposicao" ADD CONSTRAINT "SolicitacaoReposicao_professorInteressadoId_fkey" FOREIGN KEY ("professorInteressadoId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
