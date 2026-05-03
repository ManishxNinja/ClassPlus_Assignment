import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-white shadow-md hover:bg-[var(--primary-hover)] focus-visible:ring-[var(--primary)]",
  secondary:
    "bg-zinc-900 text-white shadow-md hover:bg-zinc-800 focus-visible:ring-zinc-900",
  outline:
    "border border-zinc-200/80 bg-white/80 text-zinc-800 shadow-sm hover:bg-white hover:border-zinc-300 focus-visible:ring-zinc-400",
  ghost:
    "text-zinc-700 hover:bg-zinc-100/80 focus-visible:ring-zinc-400",
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
