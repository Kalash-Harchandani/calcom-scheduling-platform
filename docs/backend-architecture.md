# Backend Architecture

## Tech Stack

- Node.js
- Express.js
- MySQL
- mysql2 (connection pooling)

---

## Project Structure

src/

routes/ → API route definitions  
controllers/ → HTTP request handlers  
services/ → business logic (slot generation)  
models/ → database queries  
config/ → database connection & environment configuration  
utils/ → helper utilities and async middleware  

Entry Points

index.js → server bootstrap  
app.js → express configuration & middleware

---

## System Modules

### Event Types

Manages meeting types.

Example:

- 30 Minute Meeting
- Intro Call

Each event type contains:

- title
- description
- duration
- unique slug

Public booking URL format:

/book/:slug

Example:

/book/30-min-meeting

---

### Availability Scheduling

Defines when a user is available for meetings.

Supports:

- weekly schedule
- multiple time ranges per day
- timezone support
- prevention of overlapping ranges

Example availability:

Monday  
09:00 → 12:00  
13:00 → 17:00

---

### Slot Generation Engine

Core scheduling logic.

Inputs:

- availability ranges
- event duration
- existing bookings

Algorithm:

availability ranges  
+ event duration  
- booked slots  
= available booking slots

Example:

Availability range:  
09:00 → 10:00

Event duration:  
30 minutes

Generated slots:

09:00  
09:30

---

### Booking System

Handles meeting reservations.

Stored fields:

- event_type_id
- name
- email
- booking_date
- start_time
- end_time
- status

Features:

- create booking
- cancel booking
- upcoming bookings
- past bookings
- double booking prevention

---

## API Endpoints

### Events

POST /api/events  
GET /api/events  
PUT /api/events/:id  
DELETE /api/events/:id

---

### Availability

POST /api/availability  
GET /api/availability  
PUT /api/availability/:id  
DELETE /api/availability/:id

---

### Slots

GET /api/slots?slug=<event_slug>&date=<YYYY-MM-DD>

Returns available booking slots.

---

### Bookings

POST /api/bookings  
GET /api/bookings/upcoming  
GET /api/bookings/past  
DELETE /api/bookings/:id

---

## Design Decisions

- layered architecture for separation of concerns
- service layer for core scheduling logic
- database constraints to prevent overlapping availability
- parameterized SQL queries to prevent injection
- connection pooling for efficient DB access

---

## Future Improvements

- date overrides
- buffer time between meetings
- email notifications
- rescheduling support
- multi-user support