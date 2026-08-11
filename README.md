<img width="680" height="220" alt="bakbak-logo (1)" src="https://github.com/user-attachments/assets/2f829092-4063-4321-8fe1-c24e3e9fb192" />![<svg width="680" height="220" viewBox="0 0 680 220" xmlns="http://www.w3.org/2000/svg" role="img">
<title>Bak-Bak logo</title>
<desc>Minimalist single-color line-art parrot head icon with the Bak-Bak wordmark</desc>

<defs>
<linearGradient id="yellowPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#f5ec8e"/>
<stop offset="50%" stop-color="#f5cfc0"/>
<stop offset="100%" stop-color="#f9c9de"/>
</linearGradient>
</defs>

<g fill="none" stroke="#b8860b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
<path fill="url(#yellowPinkGrad)" d="M120 60 C160 50 190 70 195 105 C198 128 185 148 165 158 L165 175 C165 180 160 183 156 179 L145 165 C120 168 98 152 92 128 C86 104 96 72 120 60 Z"/>
<path fill="url(#yellowPinkGrad)" d="M195 105 C215 100 230 108 232 118 C230 126 215 130 197 122"/>
<circle cx="145" cy="90" r="4" fill="#b8860b"/>
<path d="M92 128 C80 132 68 130 62 122" />
<path d="M100 145 C90 150 78 150 70 142"/>
</g>

<text x="270" y="130" font-size="64" font-weight="500" fill="#ffffff" font-family="Helvetica, Arial, sans-serif" letter-spacing="1">Bak-Bak</text>
</svg>
Uploading bakbak-logo (1).svg…]()

<title>Bak-Bak logo</title>
<desc>Minimalist single-color line-art parrot head icon with the Bak-Bak wordmark</desc>

<defs>
<linearGradient id="yellowPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="#f5ec8e"/>
<stop offset="50%" stop-color="#f5cfc0"/>
<stop offset="100%" stop-color="#f9c9de"/>
</linearGradient>
</defs>

<g fill="none" stroke="#b8860b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
<path fill="url(#yellowPinkGrad)" d="M120 60 C160 50 190 70 195 105 C198 128 185 148 165 158 L165 175 C165 180 160 183 156 179 L145 165 C120 168 98 152 92 128 C86 104 96 72 120 60 Z"/>
<path fill="url(#yellowPinkGrad)" d="M195 105 C215 100 230 108 232 118 C230 126 215 130 197 122"/>
<circle cx="145" cy="90" r="4" fill="#b8860b"/>
<path d="M92 128 C80 132 68 130 62 122" />
<path d="M100 145 C90 150 78 150 70 142"/>
</g>

<text x="270" y="130" font-size="64" font-weight="500" fill="#ffffff" font-family="Helvetica, Arial, sans-serif" letter-spacing="1">Bak-Bak</text>
</svg>


<p align="center">
  A skeleton end-to-end web chat application — log in, see who's online, and chat in real time over raw WebSockets.
</p>

<p align="center">
  <a href="https://github.com/animesh1798/BuckChat/stargazers"><img src="https://img.shields.io/github/stars/animesh1798/BuckChat?style=flat-square" alt="Stars"></a>
  <a href="https://github.com/animesh1798/BuckChat/network/members"><img src="https://img.shields.io/github/forks/animesh1798/BuckChat?style=flat-square" alt="Forks"></a>
  <a href="https://github.com/animesh1798/BuckChat/issues"><img src="https://img.shields.io/github/issues/animesh1798/BuckChat?style=flat-square" alt="Issues"></a>
  <a href="https://github.com/animesh1798/BuckChat/commits/main"><img src="https://img.shields.io/github/last-commit/animesh1798/BuckChat?style=flat-square" alt="Last commit"></a>
  <img src="https://img.shields.io/badge/license-unspecified-lightgrey?style=flat-square" alt="License">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node/Express">
  <img src="https://img.shields.io/badge/WebSocket-ws-black?style=flat-square&logo=websocket&logoColor=white" alt="WebSocket">
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#data-model">Data Model</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a>
</p>

---

## About

**Bak-Bak** (repo: `BuckChat`) is a minimal, end-to-end chat application built to walk through the core plumbing of a real-time messaging app: identify a user, track who's online, and push messages between two connected clients over a raw WebSocket — no chat framework, no Socket.IO, just Express and the `ws` library.

## Features

- 🔑 **Frictionless login** — sign in with just a name and email; if the email is new, a `User` row is created on the fly
- 🟢 **Online presence** — logging in adds you to an `OnlineUser` table; the dashboard polls the backend every 5 seconds to show who's currently online
- 💬 **Real-time 1:1 chat** — opening a chat with someone opens a dedicated WebSocket connection (`ws://.../?userId=<id>`) for that session
- 📨 **Server-relayed messages** — the backend keeps an in-memory map of `userId → socket` and forwards each message straight to the recipient's live connection, if they're online
- 🗄️ **Persisted history** — every message is written to Postgres via Prisma as it's sent
- 🚪 **Logout** — clears your socket entry and removes you from the `OnlineUser` table

## Tech Stack

**Backend** (`/backend`)
- Node.js + [Express 5](https://expressjs.com/) (TypeScript, `tsx` for dev)
- [`ws`](https://github.com/websockets/ws) — plain WebSocket server, upgraded from the HTTP server
- [Prisma](https://www.prisma.io/) ORM + **PostgreSQL**
- `bcrypt` and `jsonwebtoken` are already in `package.json`, scaffolded for a future real auth layer (not wired into the login flow yet)
- Package management via **pnpm** (workspace)

**Frontend** (`/frontend`)
- [React 19](https://react.dev/) + TypeScript, built with **Vite**
- `react-router-dom` for client-side routing (`/`, `/online`, `/chat`)
- Plain `fetch` calls + `sessionStorage` for session state — no global state library
- Package management via **npm**

## How It Works

1. **Login** (`POST /`) — the frontend posts `{ name, email }`. The backend looks the user up by email; if they don't exist, it creates them, then adds a row to `OnlineUser`. The returned user object is stashed in `sessionStorage` as `myDetails`.
2. **Online users** (`GET /online`) — the dashboard polls this endpoint every 5 seconds and renders everyone in the `OnlineUser` table except yourself, each with a **Chat!** button and a green status dot.
3. **Opening a chat** — clicking **Chat!** stores the target user in `sessionStorage` as `receiverDetails` and navigates to `/chat`, which opens a WebSocket to `ws://localhost:3000?userId=<yourId>`.
4. **Sending a message** — the client sends `{ senderId, receiverId, data, time }` over the socket. The server persists it with `prisma.message.create` and, if the receiver has an active socket in its in-memory `clients` map, forwards the message to them instantly.
5. **Logout** (`POST /logout`) — removes your entry from the server's in-memory socket map and deletes your `OnlineUser` row.

> Note: message history isn't fetched from the database when a chat is opened yet — the chat window only shows messages sent during the current session (the frontend has scroll-up pagination logic scaffolded for this, but it isn't wired to an endpoint yet).

## Screenshots

### Login
Sign in with just a name and email.

<table>
  <tr>
    <td><img width="322" alt="Login screen 1" src="https://github.com/user-attachments/assets/7b1b1f64-c446-4731-9036-1e6f6ba58bc7" /></td>
    <td><img width="289" alt="Login screen 2" src="https://github.com/user-attachments/assets/e539d547-900e-420b-8e12-1c2422c0fe1f" /></td>
  </tr>
</table>

### Online Users
See who else is online and jump into a chat with them.

<table>
  <tr>
    <td><img width="600" alt="Online users dashboard 1" src="https://github.com/user-attachments/assets/c5a68b72-95f6-4fea-a794-b242628e9699" /></td>
    <td><img width="636" alt="Online users dashboard 2" src="https://github.com/user-attachments/assets/1f7b6c64-1efb-4096-8b6b-eebb483c564e" /></td>
  </tr>
</table>

### Real-Time Chat
Messages are delivered instantly over WebSockets.

<table>
  <tr>
    <td><img width="420" alt="Chat window 1" src="https://github.com/user-attachments/assets/75475262-920e-410a-bba3-f50742dc79a0" /></td>
    <td><img width="420" alt="Chat window 2" src="https://github.com/user-attachments/assets/6e236aac-dcbf-44e0-9ff2-e3c52042f44c" /></td>
  </tr>
</table>

## Data Model

Defined in `backend/prisma/schema.prisma`:

```prisma
model User {
  id           String    @id @default(uuid())
  name         String?
  email        String    @unique
  sentMessages Message[] @relation("SentMessages")
  recvMessages Message[] @relation("ReceivedMessages")
  onlineUser   OnlineUser?
}

model Message {
  id         String @id @default(uuid())
  senderId   String
  receiverId String
  data       String
  time       String
  sender     User   @relation("SentMessages", fields: [senderId], references: [id])
  receiver   User   @relation("ReceivedMessages", fields: [receiverId], references: [id])
}

model OnlineUser {
  userId String @id
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

- **`User`** — a person's profile (`name`, unique `email`) plus the messages they've sent and received.
- **`Message`** — one chat message: sender, receiver, text (`data`), and a `time` string, stored as it's relayed over the socket.
- **`OnlineUser`** — a presence flag; a row here means that user is online. It's removed on logout, and `onDelete: Cascade` cleans it up automatically if the user is ever deleted.

## Getting Started

### Prerequisites
- Node.js
- [pnpm](https://pnpm.io/) (backend) and npm (frontend)
- A PostgreSQL database

### Backend

```bash
cd backend
pnpm install

# create a .env file with your database connection
echo "DATABASE_URL=postgresql://user:password@localhost:5432/bakbak" > .env

# apply the Prisma migrations already in prisma/migrations
pnpm exec prisma migrate deploy
# (or `pnpm exec prisma migrate dev` if you plan to change the schema)

pnpm dev
# → Server running on port 3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → Vite dev server, default http://localhost:5173
```

The frontend currently talks to the backend at hardcoded `http://localhost:3000` / `ws://localhost:3000` URLs (see `Login.tsx`, `OnlineUsers.tsx`, `ChatInterface.tsx`) — update those if you run the backend elsewhere.

## Project Structure

```
BuckChat/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma       # User / Message / OnlineUser models
│   │   └── migrations/
│   └── src/
│       ├── controller/         # loginUser.controller.ts
│       ├── middleware/         # validateLoginInfo.ts
│       ├── lib/                # prisma client
│       ├── types/              # shared TS types
│       └── server.ts           # Express app + ws server + routes
└── frontend/
    └── src/
        ├── components/
        │   ├── Login.tsx
        │   ├── OnlineUsers.tsx
        │   └── ChatInterface.tsx
        └── App.tsx              # routes: /, /online, /chat
```

## Roadmap Ideas

Since this is a skeleton app, some natural next steps:
- [ ] Wire up real authentication (`bcrypt` + `jsonwebtoken` are already installed but unused)
- [ ] Fetch and paginate persisted chat history when a chat window opens
- [ ] Replace 5-second polling for online users with a push update (the WebSocket server is already there)
- [ ] Group chats / channels
- [ ] Typing indicators & read receipts

## License

No license file is currently included. Add one (e.g. MIT) if you plan to accept contributions or allow reuse.
