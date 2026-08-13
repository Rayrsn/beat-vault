# Step 2: Industrial Brutalist Design System & UI/UX (Preview Showcase Edition)

## 1. Aesthetic Vision & Visual Identity

The **Rayr Beats** web application features a raw, high-contrast **Industrial Brutalist UI design** tailored specifically for **audio previewing and producer showcase**. 

Drawing inspiration from technical studio hardware, neon-lit industrial machinery, and cyberpunk audio workstation interfaces, this design uses an electric **Blueish Purple** color palette with high-contrast impact typography.

```
+-----------------------------------------------------------------------+
|  [|||||||] RAYR // INDUSTRIAL PREVIEW VAULT          [SEARCH] [FILTER]|
+-----------------------------------------------------------------------+
|  // FEATURED PREVIEW: BEAT PACK X                                    |
|  ###################################################################  |
|  #  MAX MADNESS                                  [PREVIEW] [160 BPM]#  |
|  #  /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ #  |
|  ###################################################################  |
+-----------------------------------------------------------------------+
|  [MARQUEE: BEAT PACK X PREVIEWS // TRAP // DRILL // JUICE WRLD TYPE]   |
+-----------------------------------------------------------------------+
```

---

## 2. Design System Tokens & Specs

### A. Color Palette (Blueish Purple & Matte Void)
| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `--bg-void` | `#07060B` | Deep primary backdrop |
| `--bg-panel` | `#100E17` | Card & player panel backgrounds |
| `--bg-card` | `#151320` | Track card container background |
| `--bg-card-hover` | `#1E1A2E` | Card hover state background |
| `--border-steel` | `#28243A` | Exposed grid borders & card outlines |
| `--border-steel-bright` | `#3D3758` | Active element outlines |
| `--text-main` | `#F3F0FD` | Primary high-contrast text |
| `--text-muted` | `#8B85AB` | Secondary metadata text |
| `--accent-purple` | `#8B5CF6` | Primary blueish purple interactive accent |
| `--accent-purple-bright` | `#A78BFA` | Glow & active playing highlight |
| `--accent-blue` | `#3B82F6` | Secondary electric blue highlight |
| `--accent-magenta` | `#C084FC` | Peak visualizer spectrum highlight |

### B. Typography Stack
- **Header & Impact Titles**: `Syne` (900 ExtraBold) & `Bebas Neue`
- **Body & Subheadings**: `Space Grotesk` (500/700)
- **Technical Metadata & Code Badges**: `JetBrains Mono` (400/700 Monospace)

### C. Brutalist UI Components
1. **Raw Border Enclosures**: 2px solid steel borders with sharp 0px radius corners.
2. **Technical Badges**: Monospace tags e.g. `[140 BPM]`, `[C# MINOR]`, `[PREVIEW STREAM]`.
3. **Continuous Text Marquees**: Hardware-accelerated CSS marquee tickers displaying preview updates.
4. **Realtime Equalizer Canvas**: High-FPS frequency bar visualizer reacting directly to HLS Web Audio streams.

---

## 3. Navigation & Directory Mapping

- Audit document: [01-site-audit-and-architecture.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/01-site-audit-and-architecture.md)
- Design system: [02-brutalist-design-system.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/02-brutalist-design-system.md)
- Audio engine: [03-audio-engine-and-data-migration.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/03-audio-engine-and-data-migration.md)
- Frontend build: [04-modern-frontend-implementation.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/04-modern-frontend-implementation.md)
- Deployment: [05-deployment-and-optimization.md](file:///home/rayr/Desktop/htdocs-rayr.cf/plan/05-deployment-and-optimization.md)
