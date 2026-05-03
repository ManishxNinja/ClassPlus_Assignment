# Technical Approach - Custom Greetings App

## Problem-Solving Approach

The primary requirement is deterministic image overlay: the app must place the user's profile photo and name on top of a selected template and export a single merged image.

Approach used:
1. Keep editor controls in centralized client state (`Zustand`) so preview/share actions use one source of truth.
2. Render composition using `Canvas` in `src/lib/image-composer.ts`:
   - draw base template
   - clip circular path for profile image
   - draw profile image in clipped region
   - stroke + fill text for legible username overlay
   - export PNG blob + data URL
3. Reuse this same compose function for both preview generation and share/download output to avoid visual mismatch.

## Tech Stack

- Next.js App Router (TypeScript)
- Tailwind CSS
- Zustand with persisted local state
- NextAuth for authentication strategy compatibility
- HTML Canvas API for merging layers
- Playwright for smoke flow coverage

## Key Challenges and Mitigations

### 1) Client-side overlay consistency
- **Challenge**: preview and final export can diverge if they use different render paths.
- **Mitigation**: one `composeGreetingImage` function used by both actions.

### 2) Premium gating UX continuity
- **Challenge**: after upgrade, user should return to their intended premium template.
- **Mitigation**: store `pendingTemplateId`; route to that template immediately after upgrade.

### 3) Sharing compatibility on web
- **Challenge**: `navigator.share` support and file sharing vary by device/browser.
- **Mitigation**: detect capability, use Web Share when available, fallback to PNG download, and provide WhatsApp text intent shortcut.

## Scalability and Future Improvements

1. Replace static template data with API/CMS and signed asset URLs.
2. Move premium entitlement to backend + billing provider (Stripe/Razorpay).
3. Add server-side image composition queue for low-end client devices.
4. Add text styles, stickers, and multilayer editor timeline.
5. Introduce object storage for generated cards and share links.
6. Expand automated tests to include premium, auth provider, and share fallbacks across browsers.

