import { NextResponse, NextRequest } from "next/server"; 
import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();


type ProfessorProps= {
  params: {
    id: string; 
  };
};

//Busca por ID
export async function GET(request: NextRequest, { params }: ProfessorProps) {
  const professor = await prisma.professor.findUnique({
    where: { id: Number(params.id) },
  });
  
  if (!professor) {
    return NextResponse.json({ message: "fudeu não achou o professor!" }, { status: 404 });
  }

  return NextResponse.json(professor);
}

//Atualiza os dados do professor
export async function PUT(request: NextRequest, { params }: ProfessorProps) {
  const data = await request.json();
  const professor = await prisma.professor.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(professor);
}

// DELETE
export async function DELETE(request: NextRequest, { params }: ProfessorProps) {
  try {
    await prisma.professor.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Passei o facão no professor!" }, { status: 200 });
  } catch (error) {

    return NextResponse.json({ message: "Erro ao passar o facão no professor. ID não encontrado." }, { status: 404 });
  }
}