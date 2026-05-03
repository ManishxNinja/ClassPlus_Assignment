"use client";

interface LoginOptionsProps {
  onGoogleLogin: () => void;
  onEmailLogin: (email: string) => void;
  onGuestLogin: () => void;
}

export default function LoginOptions({
  onGoogleLogin,
  onEmailLogin,
  onGuestLogin,
}: LoginOptionsProps) {
  return (
    <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="text-lg font-semibold text-zinc-900">Choose login method</h2>
      <button
        type="button"
        onClick={onGoogleLogin}
        className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Continue with Google
      </button>
      <form
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const email = String(formData.get("email") ?? "");
          if (email.trim()) {
            onEmailLogin(email.trim());
          }
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter email"
          className="flex-1 rounded-xl border border-zinc-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Use Email
        </button>
      </form>
      <button
        type="button"
        onClick={onGuestLogin}
        className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        Continue as Guest
      </button>
    </section>
  );
}

