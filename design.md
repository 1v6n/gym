# Design: Hypertrophy DDP PWA

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: app screen
- Theme: Linear (vibe: "deep black canvas, lavender accent, technical sans")
- Axes: dark/grotesk-sans/cool · posture: committed

## Tokens
`assets/css/tokens.css` is the source of truth. The roles:
```css
:root {
  /* Linear Deepest Dark Canvas & Surface Ladder */
  --color-paper: oklch(12% 0.005 260);       /* #010102 deepest dark canvas */
  --color-paper-2: oklch(15.5% 0.008 260);   /* #0f1011 surface-1 */
  --color-paper-3: oklch(18.5% 0.010 260);   /* #141516 surface-2 */
  --color-paper-4: oklch(22% 0.012 260);     /* #18191a surface-3 */

  /* Text & Inks */
  --color-ink: oklch(97.5% 0.005 260);       /* #f7f8f8 crisp near-white */
  --color-ink-2: oklch(87% 0.012 260);       /* #d0d6e0 secondary ink */
  --color-muted: oklch(64% 0.015 260);       /* #8a8f98 tertiary ink */
  --color-faint: oklch(48% 0.012 260);       /* #62666d subtle footnote */

  /* Hairline Borders */
  --color-rule: oklch(98% 0.005 260 / 0.10); /* #23252a hairline */
  --color-rule-focus: oklch(56% 0.18 275);   /* #5e69d1 focus border */
  --color-light: oklch(99% 0.002 260);
  --color-shade: oklch(5% 0.005 260);
  --color-overlay: oklch(5% 0.005 260 / 0.88);

  /* Signature Linear Lavender-Blue Accent */
  --color-accent: oklch(56% 0.18 275);       /* #5e6ad2 primary brand CTA */
  --color-accent-ink: oklch(99% 0.002 260);  /* white on primary */
  --color-accent-hi: oklch(68% 0.16 275);    /* #828fff hover */
  --color-accent-deep: oklch(46% 0.18 275);  /* pressed */
  --color-accent-soft: oklch(90% 0.04 275);
  --color-accent-bg: oklch(20% 0.04 275);    /* subtle lavender tint */
  --color-accent-rule: oklch(38% 0.08 275);
  --color-focus: oklch(58% 0.18 275);        /* 2px focus outline */

  /* Secondary / Overload / Deload Signals */
  --color-accent-2: oklch(68% 0.14 290);     /* soft violet / tertiary */
  --color-accent-2-bg: oklch(20% 0.03 290);
  --color-accent-2-rule: oklch(36% 0.06 290);

  /* Semantics */
  --color-success: oklch(66% 0.17 145);      /* #27a644 Linear status green */
  --color-success-bg: oklch(20% 0.04 145);
  --color-success-rule: oklch(36% 0.08 145);
  --color-error: oklch(65% 0.18 27);         /* #eb5757 */
  --color-error-bg: oklch(22% 0.05 27);
  --color-error-rule: oklch(38% 0.10 27);

  /* Typography */
  --font-display: "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-body: "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "Geist Mono", "SF Mono", ui-monospace, Menlo, monospace;

  /* Ergonomics */
  --radius-card: 12px;
  --radius-inner: 8px;
  --radius-pill: 9999px;
  --rule-hair: 1px;
  --tracking-display: -0.025em;
  --display-weight: 600;
}
```

## Controls
- Primary: solid filled Linear lavender (`--color-accent`), 8px radius, min 44px touch height.
- Secondary / Outlines: subtle surface or hairline outline, same radius and touch targets.

## Motion
- Character: brisk and precise (80-140ms ease-out transitions); reduced motion respected.

## Exports
- `assets/css/tokens.css` in this project.
