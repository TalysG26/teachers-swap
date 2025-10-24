/*
  Warnings:

  - You are about to drop the column `status` on the `Aula` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `SolicitacaoReposicao` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `Aula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `SolicitacaoReposicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aula" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SolicitacaoReposicao" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "public"."StatusAula";

-- DropEnum
DROP TYPE "public"."StatusSolicitacao";

-- CreateTable
CREATE TABLE "StatusAulaDB" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "StatusAulaDB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusSolicitacaoDB" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "StatusSolicitacaoDB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StatusAulaDB_nome_key" ON "StatusAulaDB"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "StatusSolicitacaoDB_nome_key" ON "StatusSolicitacaoDB"("nome");

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusAulaDB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolicitacaoReposicao" ADD CONSTRAINT "SolicitacaoReposicao_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "StatusSolicitacaoDB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
