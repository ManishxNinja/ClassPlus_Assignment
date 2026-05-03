# Custom Greetings App

Custom Greetings App is a Next.js web app that lets users:

- sign in with **email** (NextAuth credentials — demo, no verification email)
- set profile name and photo
- browse categorized greeting templates with live overlays
- unlock premium templates via upsell flow
- personalize and merge layers into a single image
- share/download generated greetings

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Zustand (session/profile/editor state)
- NextAuth (email credentials provider for demo)
- HTML Canvas API for image composition
- Playwright for smoke E2E test

## Project Structure

- `src/app/(auth)/login/page.tsx`: email login and profile setup flow
- `src/app/(main)/home/page.tsx`: template listing, categories, premium gating
- `src/app/(main)/editor/[templateId]/page.tsx`: editor route entrypoint
- `src/components/templates/EditorClient.tsx`: personalization + compose + share
- `src/components/templates/*`: template grid and live preview components
- `src/components/premium/UpsellModal.tsx`: subscription/upsell popup
- `src/store/useAppStore.ts`: persisted app state
- `src/lib/image-composer.ts`: canvas merge utility
- `src/data/templates.ts`: template catalog and categories
- `docs/technical-approach.md`: architecture/challenges/future improvements

## Setup

### 1) Install dependencies

```bash
npm install
```

### 2) (Optional) NextAuth secret

For production, set a strong secret in `.env.local`:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-long-random-secret
```

### 3) Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: run local dev server
- `npm run build`: production build
- `npm run start`: start production server
- `npm run lint`: run ESLint
- `npm run test:e2e`: run Playwright smoke test (install browsers first: `npx playwright install`)

## Demo Flow Checklist

Use this for internship submission recording:

1. Sign in with **email** on the login page
2. Complete profile setup (name + photo)
3. Open home and browse categories
4. Click a **premium** template and show the upsell popup
5. Upgrade, open the editor, adjust controls
6. Generate merged output
7. Share/download the PNG

## Known Constraints

- Web Share API behavior varies across browsers/devices.
- Email sign-in is a **demo** flow (no magic link or password).
- Current premium flow uses local simulated subscription state.
