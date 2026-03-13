## ⚠️ Known Network Limitation

The application may not load correctly on some restricted networks 
(e.g., certain college or office Wi-Fi)
If the app does not load:
- Try accessing it using mobile data or another network.




<p align="center">
  <img src="./demo.gif" width="800"/>
</p>

# Cal.com Clone: Scheduling & Booking Platform

<p>
  <img src="https://skillicons.dev/icons?i=react,nodejs,express,mysql,tailwind,docker,vercel,aws,cursor,chatgpt"/>
</p>

A high-performance, full-stack scheduling platform inspired by Cal.com. This application replicates the core booking experience, allowing users to manage meeting types, set granular availability, and share public booking links.

---

## ✨ Key Features

### 🛠️ Admin Dashboard (Seed User)
- **Event Types Management**: Create, edit, and delete event types (e.g., 30-min discovery, 1-hour consultation).
- **Unique Slugs**: Each event type generates a dedicated public URL for booking.
- **Availability Control**: Set active days, time ranges, and timezones (supported for Asia/Kolkata).
- **Bookings Dashboard**: Real-time view of upcoming and past appointments with cancellation capability.

### 📅 Public Booking Flow
- **Interactive Calendar**: Elegant date selection with dynamic slot generation.
- **Availability Logic**: Time slots are automatically filtered based on admin settings and existing bookings.
- **Double-Booking Prevention**: Robust logic to ensure no two meetings overlap on the same event type.
- **Confirmation Page**: Instant feedback with meeting details upon successful booking.

### 🚀 Bonus Features Implemented

- **Email Notifications**: Automated booking confirmation and cancellation emails using SMTP with Nodemailer.
- **Buffer Time Between Meetings**: A 15-minute buffer is automatically enforced between meetings to prevent back-to-back bookings. The buffer logic is handled on the backend.

----

### Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL with a relational schema optimized for scheduling.
- **Tools**: Day.js for time manipulation, Docker for containerized deployment.
- **Deploy**: Vercel for client-side and AWS EC2 for server-side.

### 📊 Database Schema
The database is structured to handle complex scheduling relationships:
- `event_types`: Stores meeting configurations (title, duration, slug).
- `availability`: Manages weekly recurring slots and timezone data.
- `bookings`: Tracks all scheduled events with relationship to event types.

---
### 🚀 Technical Highlights

- **Advanced Slot Generation Logic**: Implemented a pure math-based slot engine with overlap detection, 15-minute booking buffer, and past-time filtering to ensure conflict-free, human-friendly scheduling.
- **Global Error Handling**: A centralized error-handling middleware (`server/src/middlewares/errorMiddleware.js`) captures all exceptions across the API, ensuring consistent JSON error responses and simplified debugging.
- **Structural Modularity**: The codebase follows a clean, modular architecture separating concerns into:
  - **Routes**: Clean API endpoint definitions.
  - **Controllers**: Practical request/response orchestration.
  - **Services**: Pure logic (like slot generation) decoupled from HTTP details.
  - **Models**: Efficient database interactions using SQL.
---
## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- MySQL

### Local Setup
1. **Clone the Repo**:
   ```bash
   git clone <repository-url>
   cd calcom-scheduling-platform
   ```

2. **Backend Configuration**:
   ```bash
   cd server
   cp .env.example .env
   # Update .env with your MySQL and SMTP credentials
   npm install
   npm run dev
   ```

3. **Frontend Configuration**:
   ```bash
   cd ../client
   npm install
   npm start
   ```

### 🐳 Docker Support
Run the entire stack with one command:
```bash
docker-compose up --build
```

