# URL Shortener

A simple URL shortener application built with Node.js, Express, MongoDB, and React.

## Features

- Shorten long URLs to easy-to-share short links
- Redirect short URLs to the original address
- Prevents duplicate short URLs for the same original URL
- RESTful API backend
- Simple React frontend

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (for MongoDB, optional)
- [MongoDB](https://www.mongodb.com/) (local or Docker)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tulioneme/url-shortner.git
cd url-shortner
```

### 2. Start MongoDB with Docker

```bash
docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:latest
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` folder:

```
MONGO_URI=mongodb://admin:secret@localhost:27017/urlshortner?authSource=admin
PORT=3000
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

### 5. Start the Backend

```bash
node index.js
```

### 6. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 7. Start the Frontend

```bash
npm start
```

The frontend will be available at [http://localhost:3000](http://localhost:3000) (or another port if specified).

## API Endpoints

### POST `/api/shorten`

Shorten a URL.

**Request Body:**

```json
{
  "originalUrl": "https://example.com"
}
```

**Response:**

```json
{
  "originalUrl": "https://example.com",
  "shortUrl": "abc123"
}
```

### GET `/api/:shortUrl`

Redirects to the original URL.

---

## License

MIT

---
