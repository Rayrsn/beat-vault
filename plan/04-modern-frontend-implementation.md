# Step 4: Frontend Implementation & UI Construction

## 1. Modular Frontend Architecture

The user interface will be built using standard, modern web standards (Vanilla JS + HTML5 + CSS Grid/Flexbox with optional Vite setup).

```
/src (or root web root)
├── index.html                  # Main application structure & semantic layout
├── index.css                   # Core industrial design system tokens & styles
├── js/
│   ├── app.js                  # App initialization, router, and event bus
│   ├── beats-data.js           # Beat catalog data parser & filtering engine
│   ├── audio-player.js         # HLS.js + Web Audio API visualizer engine
│   ├── brutalist-effects.js    # Parallax, 3D tilt, marquee, scanlines controller
│   └── ui-components.js        # Dynamic HTML string generators for beat items
└── data/
    └── beats-manifest.json     # Consolidated beat catalog JSON data
```

---

## 2. Core UI Modules & Layout Specifications

```
+-----------------------------------------------------------------------------------+
|  [NAV] RAYR BEATS // VAULT 2.0                 [SEARCH] [FILTER BPM/KEY] [THEME]  |
+-----------------------------------------------------------------------------------+
|  [HERO PARALLAX SECTION]                                                         |
|  // INDUSTRIAL AUDIO SHOWCASE                                                     |
|  RAYR PROD. // RAW TRAP, DRILL & AMBIENT BEATS                                    |
|  [MARQUEE TICKER: BEAT PACK X AVAILABLE NOW /// NEW TRACKS UPDATED DIRECTLY]     |
+-----------------------------------------------------------------------------------+
|  [FILTER BAR]                                                                     |
|  [SEARCH BEAT...] [ALL PACKS v] [BPM: 60-180] [KEY: ALL v] [TAGS: TRAP/DRILL/R&B] |
+-----------------------------------------------------------------------------------+
|  [TRACK LIST / GRID SHOWCASE]                                                     |
|  +-----------------------------------------------------------------------------+  |
|  | 01. MAX MADNESS | BEAT PACK X | 140 BPM | C MIN | [PLAY] [VISUALIZER CANVAS]|  |
|  +-----------------------------------------------------------------------------+  |
|  | 02. INFINITY    | BEAT PACK X | 150 BPM | G MIN | [PLAY] [VISUALIZER CANVAS]|  |
|  +-----------------------------------------------------------------------------+  |
|  | 03. BANGER      | SPECIAL     | 130 BPM | D MIN | [PLAY] [VISUALIZER CANVAS]|  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
|  [STICKY INDUSTRIAL PLAYER BAR]                                                   |
|  [PLAY/PAUSE] [PREV/NEXT] // NOW PLAYING: MAX MADNESS [01:24 / 02:45] [VOL: 80%]  |
|  [PROGRESS BAR ///////////////////=================================] [QUEUE ^]  |
+-----------------------------------------------------------------------------------+
```

### Module Specifications:

1. **Industrial Navigation & Hero Section**:
   - High-contrast brutalist header with live clock/status indicator e.g. `[SYS.STATUS: ONLINE]`.
   - Hero banner with oversized impact typography (`RAYR // BEAT VAULT`), high-resolution background texture (`bg2.png`), parallax scroll dynamics, and marquee banner.

2. **Real-time Filter & Search Engine**:
   - Instant live search by title or tag without page reloads.
   - Filter pills for Beat Packs (Beat Pack X, Special, Pack 8, Pack 7, Pack 6, Sold Packs).
   - Dynamic BPM range slider & Key dropdown selectors.

3. **Beat Catalog Cards & Waveform Visualization**:
   - Industrial card grid with heavy 2px borders, exposed numbers (01, 02, ...), BPM badges, Key badges, and tag chips.
   - Hover effects featuring 3D perspective tilt and subtle neon accent glow.
   - Dynamic canvas element attached to each active track rendering a real-time Web Audio API spectrum equalizer during playback.

4. **Persistent Industrial Bottom Audio Player**:
   - Fixed sticky bar at bottom of viewport (`position: fixed; bottom: 0`).
   - Track info display, time counter, draggable progress bar with hover timestamp indicator.
   - Volume control slider, mute toggle, loop toggle, and expandable Track Queue drawer.

---

## 3. Navigation & Directory Mapping

- Audit document: [01-site-audit-and-architecture.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/01-site-audit-and-architecture.md)
- Design system: [02-brutalist-design-system.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/02-brutalist-design-system.md)
- Audio engine: [03-audio-engine-and-data-migration.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/03-audio-engine-and-data-migration.md)
- Frontend build: [04-modern-frontend-implementation.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/04-modern-frontend-implementation.md)
- Deployment: [05-deployment-and-optimization.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/05-deployment-and-optimization.md)
