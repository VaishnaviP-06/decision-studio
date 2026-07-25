<div align="center">

# Decision Studio

### Visualize better decisions through interactive decision intelligence.

A premium SaaS decision-making workspace where users can map complex choices, connect possibilities, analyze trade-offs, and generate actionable recommendations through an interactive visual canvas.

Built for **Frontend Wars 2026** — focused on creating a polished, client-side Decision Intelligence experience using modern frontend technologies.

<br/>

[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Flow](https://img.shields.io/badge/Canvas-React%20Flow-FF0072)](https://reactflow.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animation-Framer%20Motion-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br/>

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>


---

# Overview

Decision Studio transforms complex decision-making into a visual workflow.

Instead of evaluating choices through static notes or documents, users can:

- Build interactive decision maps
- Connect related choices
- Compare trade-offs
- Analyze confidence and risk
- Receive rule-based recommendations
- Present and export decision strategies

Everything runs completely inside the browser.

No backend.
No external APIs.
No cloud dependency.

---

# 🚀 Key Features

##  Interactive Decision Canvas

- Zoomable and pannable React Flow workspace
- Drag-and-drop decision nodes
- Connect decisions visually
- Select and edit decisions instantly
- Auto-arrange decision maps


##  Decision Intelligence

Built-in browser-based analysis:

- Confidence scoring
- Risk evaluation
- Pros vs cons comparison
- Decision health score (0-100)
- Rule-based recommendations


## 🔗 Relationship-Aware Decision Maps

Connect decisions using meaningful relationships:

- Supports
- Depends On
- Blocks
- Alternative

Each relationship has its own visual representation.


## 📊 Decision Analytics

Every decision can be evaluated through:

- Confidence level
- Risk explanation
- Trade-off balance
- Health score
- Recommendation insights


##  Productivity Features

- Keyboard shortcuts
- Command palette
- Decision templates
- Presentation mode
- JSON export
- Canvas image export


##  Client-Side Persistence

Decision maps are automatically saved using browser storage.

Features work without:

- Backend
- Database
- Authentication
- External services


##  Premium SaaS Experience

Inspired by:

- Linear
- Vercel
- Raycast
- Notion

Includes:

- Light mode
- Dark mode
- Responsive layouts
- Smooth animations
- Minimal professional UI


---

#  Screenshots

## Landing Page
<img width="1915" height="911" alt="Landing" src="https://github.com/user-attachments/assets/71ead43d-2bef-4ae1-8d30-c34cc029365e" />


## Preview
<img width="1916" height="905" alt="Preview_dark_bg" src="https://github.com/user-attachments/assets/50424ed3-c7ff-4eee-a063-abe13270ebe7" />


## Studio Workspace
<img width="1917" height="908" alt="Workspace_dark_bg" src="https://github.com/user-attachments/assets/2af3010a-576c-45b7-8dce-c4f98c927005" />


## Decision Analytics
<img width="1917" height="907" alt="demo_light_bg" src="https://github.com/user-attachments/assets/d19d13e7-a110-46f4-aeae-25f7221f303e" />

---

# 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 4 |
| Canvas Engine | React Flow (@xyflow/react) |
| State Management | Zustand |
| Animations | Framer Motion |
| Routing | React Router |
| Icons | Lucide React |
| Theme Management | next-themes |


---

# 🏗 Architecture

Decision Studio is a fully client-side Single Page Application.

## Application Flow

```
User Interaction

        ↓

React Components

        ↓

Zustand Store

        ↓

React Flow Canvas

        ↓

LocalStorage Persistence
```


## Main Architecture

```
src/

├── components/
│
│   ├── analysis/
│   │   └── Decision intelligence components
│   │
│   ├── canvas/
│   │   ├── React Flow canvas
│   │   └── Custom edges
│   │
│   ├── nodes/
│   │   └── Decision cards
│   │
│   ├── panels/
│   │   └── Decision inspector
│   │
│   ├── studio/
│   │   └── Workspace components
│
├── hooks/
│   └── Keyboard shortcuts and navigation logic
│
├── store/
│   └── Zustand state management
│
├── types/
│   └── Shared TypeScript models
│
├── utils/
│   ├── Decision scoring
│   ├── Recommendations
│   └── Export utilities
│
└── pages/
    ├── Landing Page
    └── Studio Workspace
```

---

# 🚀 Getting Started

## Requirements

- Node.js 18+
- npm


## Installation

```bash
git clone <repository-url>

cd decision-studio

npm install
```


## Development

```bash
npm run dev
```

Open:

```
http://localhost:5173
```


## Production Build

```bash
npm run build
```


---

# 📜 Available Scripts

| Command | Description |
|-|-|
| npm run dev | Start development server |
| npm run build | Create production build |
| npm run preview | Preview production build |
| npm run lint | Run ESLint checks |


---

#  User Workflow

Typical experience:

```
Create Decision

        ↓

Add Details

        ↓

Connect Related Decisions

        ↓

Analyze Trade-offs

        ↓

Review Recommendation

        ↓

Present / Export Decision Map
```


---

# ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|-|-|
| Ctrl / Cmd + N | Create new decision |
| Ctrl / Cmd + S | Save decision map |
| Ctrl / Cmd + K | Open command palette |
| Delete / Backspace | Remove selected decision |
| Escape | Clear selection |


---

# 🧪 Decision Intelligence Logic

All analysis happens locally.

No AI API calls.

The system calculates:

## Decision Health Score

Based on:

- Confidence
- Risk level
- Number of advantages
- Number of concerns


## Recommendations

Examples:

High confidence + low risk:

> Strong candidate. Consider moving forward.


High risk:

> Review alternatives before proceeding.


Low confidence:

> Gather more information before committing.


---

#  Deployment

The application can be deployed on platforms like:

- Vercel
- Netlify
- GitHub Pages


The project requires only static hosting.


---

#  Future Improvements

Possible future features:

- AI-assisted decision suggestions
- Team collaboration
- Cloud synchronization
- Advanced analytics dashboards
- Multiple workspace support


---
Goal : Designed as a modern client-side Decision Intelligence experience using a premium frontend stack.


---

<div align="center">

Built with  using React, TypeScript, React Flow, and modern frontend technologies.

</div>
