"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppStore } from "@/store/useAppStore";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();
  const hydrated = useAppStore((state) => state.hydrated);
  const setHydrated = useAppStore((state) => state.setHydrated);

  useEffect(() => {
    if (!hydrated) {
      setHydrated(true);
    }
  }, [hydrated, setHydrated]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading" || !hydrated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600"
          aria-hidden
        />
        <p className="text-sm font-medium text-zinc-600">Preparing your studio…</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}
