import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      name?: string;
      imageDataUrl?: string | null;
    };

    const name = body.name !== undefined ? String(body.name).trim() : undefined;
    const imageDataUrl =
      body.imageDataUrl === null || body.imageDataUrl === ""
        ? null
        : typeof body.imageDataUrl === "string"
          ? body.imageDataUrl
          : undefined;

    if (name !== undefined && !name) {
      return NextResponse.json({ error: "Name cannot be empty." }, { status: 400 });
    }

    const data: { name?: string; imageDataUrl?: string | null } = {};
    if (name !== undefined) data.name = name;
    if (imageDataUrl !== undefined) data.imageDataUrl = imageDataUrl;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[profile PATCH]", e);
    return NextResponse.json({ error: "Could not update profile." }, { status: 500 });
  }
}
