Backend Architecture

Stack:
- Node.js
- Express.js
- MySQL

Structure:
src/
  routes/       -> API route definitions
  controllers/  -> request handlers
  services/     -> business logic
  models/       -> database access
  config/       -> database and environment configuration
  utils/        -> helper utilities

index.js -> server bootstrap
app.js -> express app configuration