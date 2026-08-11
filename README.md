<p align="center">
  <img src="./frontend/public/bakbak-logo.svg" width="90" alt="Bak-Bak logo" />
</p>

<h1 align="center">Bak-Bak</h1>

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

| | |
|---|---|
| ![Login screen 1](./assets/login-1.png) | ![Login screen 2](./assets/login-2.png) |

### Online Users
See who else is online and jump into a chat with them.

| | |
|---|---|
| ![Dashboard 1](./assets/dashboard-1.png) | ![Dashboard 2](./assets/dashboard-2.png) |

### Real-Time Chat
Messages are delivered instantly over WebSockets.

| | |
|---|---|
| ![Chat window 1](./assets/chat-1.png) | ![Chat window 2](./assets/chat-2.png) |

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
