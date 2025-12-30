import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";
import { createToken } from "@/utils/createToken";

export async function POST(req: Request) {
  const { userName, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      name: userName,
    },
  });

  if (!user || !user.password) {
    return NextResponse.json(
      { message: "Credenciais invalidas" },
      { status: 401 }
    );
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch)
    return NextResponse.json({ message: "Senha inválida" }, { status: 401 });

  const token = createToken(user);

  const response = NextResponse.json(
    { message: "Logado com sucesso", user },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, 
  });

  return response;
}
