import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ProfessorProps {
    params: { id: string };
}

export async function GET(request: Request, { params }: ProfessorProps) {
  try {
    const id = Number(params.id);
    const professor = await prisma.professor.findUnique({
      where: { id },
    });

    if (!professor) {
      return NextResponse.json({ error: "Professor não encontrado" }, { status: 404 });
    }

    return NextResponse.json(professor);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}


export async function PUT(request: Request, { params }: ProfessorProps) {
  try {
    const id = Number(params.id);
    const body = await request.json();


    const emailExistente = await prisma.professor.findUnique({
      where: { id: body.id },
    });

    if (emailExistente && emailExistente.id !== id) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 400 });
    }

    const professorAtualizado = await prisma.professor.update({
      where: { id },
      data: {
        nome: body.nome,
        email: body.email,
        senha: body.senha,
        formularioReposicao: body.formularioReposicao ?? false,
      },
    });

    return NextResponse.json(professorAtualizado);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: ProfessorProps) {
  try {
    const id = Number(params.id);

    await prisma.professor.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Professor deletado com sucesso" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}