"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hydrated = useAppStore((state) => state.hydrated);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const setHydrated = useAppStore((state) => state.setHydrated);

  useEffect(() => {
    if (!hydrated) {
      setHydrated(true);
    }
  }, [hydrated, setHydrated]);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) {
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

  return <>{children}</>;
}
