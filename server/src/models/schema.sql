-- Database Schema for Cal.com Scheduling Clone

-- EVENT TYPES
-- Represents meeting types like "30 Min Meeting"
CREATE TABLE IF NOT EXISTS event_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    duration INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AVAILABILITY
-- Represents the availability of the user for scheduling meetings
CREATE TABLE availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day_of_week ENUM(
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
    ) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    timezone VARCHAR(100) DEFAULT 'Asia/Kolkata',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


