import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

type TrocaProps = {
    params: {
        id: string
    }
}

//Busca por ID
export async function GET(request: NextRequest,{params}: TrocaProps) {
    const troca = await prisma.solicitacaoReposicao.findUnique({
        where: {id: Number(params.id)}
    })

    if(!troca){
        return NextResponse.json({message: "Troca não encontrada!"}, {status: 404});
    }
}

//Atualiza os dados da troca
export async function PUT(request: NextRequest, { params }: TrocaProps  ) {
    const data = await request.json();
    const troca = await prisma.solicitacaoReposicao.update({
        where: { id: Number(params.id) },
        data,
    });
    return NextResponse.json(troca);
}

// DELETE
export async function DELETE(request: NextRequest, { params }: TrocaProps) {
    try {
        await prisma.solicitacaoReposicao.delete({
            where: { id: Number(params.id) },
        });
        return NextResponse.json({ message: "Troca deletada com sucesso!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Erro ao deletar a troca. ID não encontrado." }, { status: 404 });
    }
} 