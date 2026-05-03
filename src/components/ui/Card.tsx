import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/60 bg-white/85 p-6 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] backdrop-blur-md ring-1 ring-white/80 ${className}`}
    >
      {children}
    </div>
  );
}
