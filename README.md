# AI Chat — Minimal Web Chat Application

A small single-page web chat that sends user messages to an LLM (Groq) and
displays the AI response.

## Stack
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Backend:** Node.js + Express
- **LLM:** Groq API (OpenAI-compatible)

## Project structure
```
ai-chat/
├── public/           # Frontend (served as static files)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js         # Express backend + /api/chat proxy
├── package.json
├── .env.example      # Template for environment variables
└── .gitignore
```

## Prerequisites
- Node.js **18 or newer** (uses built-in `fetch`)
- A free Groq API key from https://console.groq.com/

## Setup

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd ai-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your `.env` file**
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and paste your Groq API key:
   ```
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
   ```

## Run locally
```bash
npm start
```
Open http://localhost:3000 in your browser.

## How it works
1. User types a message in the browser and clicks **Send**.
2. The frontend sends `POST /api/chat` with `{ "message": "..." }` to the backend.
3. The backend attaches the API key from `.env` and forwards the request to the Groq API.
4. The AI response is returned to the frontend and displayed in the chat window.

The API key **never** reaches the browser — it lives only on the server.

## Error handling
The backend returns clear JSON errors for:
- Missing API key (`500`)
- Empty message (`400`)
- LLM API failure (`502`)
- Network / unexpected failures (`500`)

The frontend shows these as red error messages in the chat.

## Configuration
| Variable        | Default                       | Description                |
|-----------------|-------------------------------|----------------------------|
| `GROQ_API_KEY`  | —                             | **Required.** Your Groq key |
| `GROQ_MODEL`    | `llama-3.3-70b-versatile`     | Groq model to use          |
| `PORT`          | `3000`                        | Port the server listens on |
