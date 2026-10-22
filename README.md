# AI Smart Math Board — Modular Web Application

This project is structured as a Vite-powered ES-module application rather than a single HTML file with a large script.

## Folder structure

```text
ai-smart-math-board/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
├── README.md
├── server/
│   └── index.js
├── tests/
│   └── math.test.js
└── src/
    ├── main.js
    ├── styles/
    │   ├── base.css
    │   ├── layout.css
    │   ├── canvas.css
    │   └── responsive.css
    ├── core/
    │   ├── store.js
    │   └── history.js
    ├── math/
    │   ├── vector.js
    │   └── formulas.js
    ├── board/
    │   └── board-controller.js
    ├── geometry/
    │   └── geometry-controller.js
    ├── coordinates/
    │   └── coordinate-controller.js
    ├── graph/
    │   └── function-controller.js
    ├── three/
    │   └── solid-scene.js
    ├── animation/
    │   └── construction-player.js
    ├── commands/
    │   └── command-router.js
    ├── ui/
    │   ├── bindings.js
    │   └── inspector.js
    ├── persistence/
    │   ├── project-store.js
    │   └── export.js
    └── ai/
        └── ai-client.js
```

## Requirements
- Node.js 20 or later recommended.
- Internet connection for npm packages and optional hosted fonts.
- A modern browser with WebGL support for the 3D lab.

## Run the website
1. Extract this folder.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL Vite prints, usually `http://localhost:5173`.

## Optional AI backend
1. Copy `.env.example` to `.env`.
2. Put your API key in `.env` on the server side only.
3. Install dependencies using `npm install`.
4. In one terminal run `npm run server` (API on port 8787).
5. In another terminal run `npm run dev`. Vite forwards `/api` requests to the local server on port 8787.
6. For local development, configure a proxy in `vite.config.js` if you want `/api` calls forwarded to port 8787; do not expose your key in `src/`.

The AI backend is an optional secure starting point. The browser's AI client gracefully falls back when the server is not running. Production deployments should add authentication, rate limiting, origin restrictions, request logging policies, and appropriate secret management.

## Current working feature scope
- Multi-file modular UI with responsive navigation and light/dark theme.
- Interactive SVG smartboard with freehand strokes, notes, triangle vertices, circles and undo/redo state snapshots.
- 2D triangle and square/circle tools, live side and angle calculations.
- Coordinate plane with point plotting, coordinate labels, and point removal.
- Three.js cube with drag rotation, zoom, auto-rotation, vertex labels, edge toggle, and dimension-dependent surface area/volume.
- Function plotting for linear and quadratic-style expressions using the supported expression subset.
- Step-by-step triangle construction player with play/pause/next/restart and speed control.
- Browser local save/load, JSON import, SVG export.
- Optional Express server endpoint for AI explanations, with API key kept server-side.
- Mathematical unit tests for vector and solid formulas.

## Honest limitations
This is a larger working foundation, not the finished vision. More 3D solids, image-to-geometry recognition, constrained constructions, advanced animation sequences, graph intersection tools, PDF export, cloud accounts, and a production-grade AI command-to-object planner remain future work. The AI endpoint explains a request; it does not yet safely translate arbitrary AI output into executable drawing instructions. The current browser-side function parser is intended for a limited expression subset and should not be exposed to untrusted input in a multi-user production service.

## Android APK
This project includes Capacitor for Android. See `.github/workflows/build-apk.yml` for automated APK builds on GitHub Actions.
