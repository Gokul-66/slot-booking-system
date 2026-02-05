# Slot Booking System - Backend API

## Overview
Node.js/Express backend with MongoDB Atlas for user authentication and slot persistence.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment**: dotenv

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the server root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=4000
```

**Get MongoDB URI:**
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP address
4. Get connection string from "Connect" → "Connect your application"

### 3. Start Development Server
```bash
npm run dev
```

Server will start on `http://localhost:4000`

## API Endpoints

### Authentication

#### POST /auth/signup
Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "slots": []
  }
}
```

#### POST /auth/login
Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "slots": [...]
  }
}
```

### User Profile

#### GET /users/me
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "slots": [...]
}
```

### Slot Management

#### PUT /users/me/slots
Update user's confirmed slots (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "slots": [
    {
      "year": 2024,
      "monthIndex": 9,
      "dayNumber": 2,
      "label": "Day 1",
      "topic": "Topic 1"
    },
    {
      "year": 2024,
      "monthIndex": 9,
      "dayNumber": 4,
      "label": "Day 2",
      "topic": "Topic 2"
    }
  ]
}
```

**Response (200):**
```json
{
  "slots": [...]
}
```

**Validation Rules:**
- Maximum 21 slots per month
- No slots on Sundays
- All fields (year, monthIndex, dayNumber, label, topic) required
- monthIndex must be 0-11
- dayNumber must be 1-31

## Database Schema

### User Model
```typescript
{
  name: string (required)
  email: string (required, unique, lowercase)
  passwordHash: string (required)
  slots: Slot[] (default: [])
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Slot Object (Embedded)
```typescript
{
  year: number (required)
  monthIndex: number (required, 0-11)
  dayNumber: number (required, 1-31)
  label: string (required)
  topic: string (required)
}
```

## Project Structure
```
server/
├── src/
│   ├── models/
│   │   └── User.ts          # Mongoose User model
│   ├── routes/
│   │   ├── auth.ts          # Authentication routes
│   │   └── user.ts          # User profile & slots routes
│   ├── middleware/
│   │   └── auth.ts          # JWT authentication middleware
│   └── server.ts            # Main server file
├── .env.example             # Environment variables template
├── package.json
└── tsconfig.json
```

## Security Features
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 7-day expiration
- Protected routes with authentication middleware
- Email uniqueness enforced at database level
- No sensitive data in responses (passwordHash excluded)

## Error Handling
All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

## Notes
- **Node Version**: Mongoose 9.x requires Node.js >= 20.19.0. If using Node 18, the packages will install with warnings but should work.
- **CORS**: Enabled for all origins in development. Configure for production.
- **MongoDB Atlas**: Free tier (M0) is sufficient for development and small-scale production.

## Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# The server will restart automatically on file changes
```

## Production Deployment
1. Set production environment variables
2. Use a strong JWT_SECRET
3. Configure CORS for specific origins
4. Enable MongoDB Atlas IP whitelist
5. Use process manager (PM2, etc.)
6. Enable HTTPS
