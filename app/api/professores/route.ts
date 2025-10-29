import { NextRequest, NextResponse } from "next/server";
import prisma   from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { email } from "better-auth";

export async function GET(request: NextRequest) {
  const professores = await prisma.professor.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(professores);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const professor = await prisma.professor.create({
      data: {
        nome: body.nome,
        email: body.email,
        senha: body.senha,
        formularioReposicao: body.formularioReposicao ?? false,
      },
    });

    return NextResponse.json(professor, { status: 201 });
  } catch (err: any) {
    console.error(" ERRO NO POST PROFESSOR:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

