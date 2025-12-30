import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

const jwt = require("jsonwebtoken");

export async function GET(req: Request) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decoded, "DECODED");

  const user = await prisma.user.findUnique({
    where: { id: decoded.sub },
    select: { id: true, name: true, role: true },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
