# Lemon — Frontend (React + Express)

This folder contains:
- a small Express server at ./api that proxies to the Flask backend
- a Vite-powered React client at ./src

## Run (dev)
1. Install deps at root of js-frontend:
   npm install
2. Start both client + server:
   npm run dev

Then open: http://localhost:3000

## Build (production)
1. Build client:
   npm run build
2. Start Express (it serves ./client/dist):
   npm start
