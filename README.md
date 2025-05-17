# Blog Posts REST API

A simple API to manage blog posts with user login, JWT authentication, and rate limiting.

---

## Features

- Register and log in users  
- Create, read, update, delete blog posts  
- JWT authentication for protected routes  
- Rate limiting (100 requests per 2 minutes)  

---

## Tech Stack

- Node.js + Express.js  
- MariaDB (XAMPP)  
- JWT, bcryptjs, express-rate-limit  
- Postman (for testing)  

---

## API Endpoints

### Auth

```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login and get token
```

### Blog Posts

```
GET    /posts                 - Get all posts
GET    /posts/:id             - Get single post
POST   /posts                 - Create post (requires token)
PUT    /posts/:id             - Update post (requires token)
DELETE /posts/:id             - Delete post (requires token)
```

---

## Data Format

### Blog Post

```json
{
  "title": "My Post",
  "content": "Post content",
  "author": "Jane"
}
```

### User

```json
{
  "username": "janedoe",
  "email": "jane@example.com",
  "password": "password123"
}
```

---

## How to Run

### 1. Requirements

- Node.js  
- XAMPP (MariaDB)

### 2. Setup

```bash
git clone https://github.com/yourusername/blog-posts-api.git
cd blog-posts-api
npm install
```

### 3. Create Database

- Open XAMPP  
- Start Apache and MySQL  
- Go to http://localhost/phpmyadmin  
- Create a new database: `blog_db`

### 4. Add `.env` File

Create a `.env` file in the root folder:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blog_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=86400
```

### 5. Start Server

```bash
npm start
```

---

## Testing with Postman

1. Import `Blog_API.postman_collection.json`  
2. Run in this order:

- Register → `/api/auth/register`  
- Login → `/api/auth/login` (copy token)  
- Use token in headers for:
  - Create post → `POST /posts`  
  - Get posts → `GET /posts`  
  - Get single post → `GET /posts/:id`  
  - Update post → `PUT /posts/:id`  
  - Delete post → `DELETE /posts/:id`  

---
