"use client";

import { useSession } from "next-auth/react";

/** Maps NextAuth session to the shape the editor and templates expect. */
export function useSessionProfile() {
  const { data: session, status, update } = useSession();

  const name = session?.user?.name?.trim() || "Creator";
  const imageDataUrl = session?.user?.image ?? null;
  const ready = status !== "loading";
  const authenticated = status === "authenticated";
  const hasProfileForEditor = Boolean(session?.user?.name?.trim() && imageDataUrl);

  return {
    status,
    update,
    name,
    imageDataUrl,
    ready,
    authenticated,
    hasProfileForEditor,
    email: session?.user?.email ?? null,
  };
}
