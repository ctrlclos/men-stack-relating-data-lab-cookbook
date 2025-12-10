# CookBook App

A recipe management application built with MongoDB, Express, and Node.js (MEN Stack).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```
MONGODB_URI=mongodb://localhost:27017/cookbook
SESSION_SECRET=your_secret_key_here
PORT=3000
```

3. Start the server:
```bash
# Development (with nodemon auto-restart + morgan logging)
npm run dev

# Production
npm start
```

4. Open http://localhost:3000

## Features

- User authentication (sign up, sign in, sign out)
- Create, read, update, and delete recipes
- Add and manage ingredients
- View other users' recipes in the community page
