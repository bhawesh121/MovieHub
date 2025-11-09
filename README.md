Movie Booking Fullstack (Backend + Client)

Folders:
- backend/  -> Express + MongoDB + JWT + TMDB + Razorpay
- client/   -> React (Vite) + Bootstrap

Setup:

1) Backend
- cd backend
- copy .env.example -> .env and fill MONGO_URI, JWT_SECRET, TMDB_API_KEY, RAZORPAY keys
- npm install
- npm run dev

2) Client
- cd client
- npm install
- npm run dev

Dev:
- Backend runs on http://localhost:5000
- Client runs on http://localhost:5173 (vite proxies /api -> backend)

Notes:
- Auth is JWT-based. Login/Register endpoints return { token, user }.
- Razorpay is used in test mode; use test card 4111 1111 1111 1111.
