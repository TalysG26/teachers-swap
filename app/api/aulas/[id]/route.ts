import { NextRequest,NextResponse } from "next/server";
import { PrismaClient} from "@/app/generated/prisma/client";

const prisma = new PrismaClient()

type AulaProps = {
    params:{
        id: string;
    };
}

//Busca por ID
export async function  GET(request: NextRequest, {params}: AulaProps) {
    const aula = await prisma.aula.findUnique({
        where: {id: Number(params.id)}
    })
    
    if(!aula){
        return NextResponse.json({message: "Aula não encontrada!"}, {status: 404});       
    }

    return NextResponse.json(aula);
}

//Atualiza os dados da aula
export async function PUT(request: NextRequest, {params}: AulaProps) {
    const data = await request.json();
    const aula = await prisma.aula.update({
        where: {id: Number(params.id)},
        data,
    });
    return NextResponse.json(aula);
}

// DELETE
export async function DELETE(request: NextRequest, {params}: AulaProps) {
    try{
        await prisma.aula.delete({
            where: {id: Number(params.id)}
        });
        return NextResponse.json({message: "Passou o facão na aula!"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Erro ao deletar a aula. ID não encontrado."}, {status: 404});
    }
}