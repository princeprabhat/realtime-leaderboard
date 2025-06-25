# 🏆 Real-Time Leaderboard System

A backend system to track real-time player scores using **Socket.IO**, **MongoDB**, and **Redis**. Built for fast updates, smooth filtering, and performance optimization.

> ⚡ Live leaderboard with real-time score sync and filtering by region & game mode.

---

### 🌐 Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** (Mongoose)
- **Redis** (Upstash)
- **Socket.IO** for real-time sync
- **EJS** for server-rendered views
- **Joi** for input validation

---

### 🔗 Demo Links

- 🔍 **Leaderboard UI**  
  [`http://localhost:5000/v1/leaderboard/view`](http://localhost:5000/v1/leaderboard/view)

- ➕ **Create Player (POST)**  
  `POST /v1/players/create`  
  Body:
  ```json
  {
    "playerId": "p1001",
    "name": "Aryan",
    "region": "Asia",
    "gameMode": "solo",
    "score": 120
  }
  ```
- ✏️ **Update Score (PATCH)**
  `PATCH /v1/players/:playerId/score`
  Body:
  ```json
  {
    "score": 120
  }
  ```
- **Top Players (GET)**
  `GET /v1/leaderboard/top`

```
filter Query => region=Asia&gameMode=solo&limit=5
```

### 🧩 Features

    ✅ Real-time leaderboard updates via Socket.IO
    ✅ Filter leaderboard by region, game mode, and limit
    ✅ Auto-refresh leaderboard when a new player is added or score updated
    ✅ Redis cache for fast reads and leaderboard optimization
    ✅ TTL logic (24h) for daily leaderboard reset
    ✅ MongoDB indexes for efficient querying
    ✅ Inline filter controls and clear button in UI
    ✅ Alert banner when filters hide updated scores

### 📁 Folder Structure

    src/
    ├── config/        → Redis, MongoDB, and env setup
    ├── controllers/   → Player & Leaderboard logic
    ├── services/      → DB and cache interactions
    ├── routes/        → All REST API routes
    ├── views/         → EJS templates
    ├── public/        → Static files (JS for frontend sockets)
    ├── socket.js      → Socket.IO setup

### ⚙️ Redis Caching

- Leaderboards are cached using keys like leaderboard:Asia:solo:10

- On player creation or score update, cache is cleared (flushall)

- TTL is applied to auto-reset data after 24 hours

**Clone repo**

```
git clone https://github.com/your-username/realtime-leaderboard.git
cd realtime-leaderboard
npm install
```

**Create .env file**

```
PORT=5000
MONGO_URI=your_mongodb_url
REDIS_URL=your_upstash_redis_url
```

**Start Server**

```
npm start
```

### 🧪 Testing

    ✅ Socket connection tested on browser reload
    ✅ Live score update verified via UI & API
    ✅ Filter + clear filter tested
    ✅ Redis cache hit/miss checked with logging
    ✅ MongoDB indexes verified via Atlas

### ✳️ Project Highlights

    ✅ Clean modular architecture
    ✅ Real-time backend in action
    ✅ Includes both REST APIs & live frontend

### ✨ Bonus

    ✅ MongoDB Index: { region: 1, gameMode: 1, score: -1 }
    ✅ Live UI refresh with socket events
    ✅ Filter alert when new scores don’t match current filters
