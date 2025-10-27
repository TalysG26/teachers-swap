import { NextRequest, NextResponse } from "next/server";
import prisma   from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { email } from "better-auth";

export async function GET(request: NextRequest) {
  const professores = await prisma.professor.findMany({
    orderBy: { criadoEm: "desc" },
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
    console.error("❌ ERRO NO POST PROFESSOR:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno no servidor" },
      { status: 500 }
    );
  }
}

// PUT /api/professores?id=123  -> atualiza (protegido)
export async function PUT(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));
  const body = await request.json();

  if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

  try {
    const updated = await prisma.professor.update({
      where: { id },
      data: {
        nome: body.nome,
        email: body.email,
       
      },
    });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });

    try {
        await prisma.professor.delete({ where: { id } });
        return NextResponse.json({ message: "Professor deletado" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}