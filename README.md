# CourseConnect – Assignment Management System

CourseConnect is a full-stack web application designed to manage assignments, student submissions, and group collaborations between students and professors.

---

## Project Overview

This project allows:
- Professors to create and monitor assignments
- Students to submit assignments (individual/group)
- Group leaders to acknowledge submissions
- Real-time tracking of assignment progress

---

## Tech Stack

### Frontend:
- React.js
- Axios
- CSS (with UI improvements)

### Backend:
- Node.js
- Express.js
- PostgreSQL

### Authentication:
- JWT (JSON Web Tokens)
- bcrypt (password hashing)

---

##  Features

###  Authentication
- User registration and login
- Role-based access (Student / Admin)
- Secure password hashing using bcrypt
- JWT-based session handling

---

### Student Features
- View all assignments
- Create groups and add members
- Submit assignments
- View submission status:
  - Pending
  - Submitted
  - Acknowledged
- Group leader can acknowledge submissions

---

### Admin Features
- Create assignments
- View all assignments
- Track submission analytics
- Monitor student activity

---

### Assignment Workflow
1. Assignment created by admin
2. Student creates group
3. Student submits assignment
4. Group leader acknowledges submission
5. Status updates across all members

---

## Database Design

Main tables:
- `user` - stores students/admins
- `assignment` - assignment details
- `group` - group information
- `group_memb` - group members
- `submissions` - submission tracking

---

## Improvements from Initial Prototype (Round-2 Enhancements)

###  Backend Improvements
- Refactored API structure (separated assignment & submission logic)
- Implemented full assignment lifecycle:
  - Pending - Submitted - Acknowledged
- Added group leader validation for acknowledgment
- Improved database schema:
  - Added `submitted`, `acknowledged` fields
  - Proper timestamp tracking
- Cleaned API responses for frontend usage

---

###  UI/UX Enhancements
- Improved dashboard layout with card-based design
- Added status indicators with colors:
  - Pending
  - Submitted
  - Acknowledged
- Added progress bars for assignment status
- Conditional buttons:
  - Submit (only when pending)
  - Acknowledge (leader only)
- Responsive grid layout for assignments

---

###  Security Improvements
- Removed `.env` from repository
- Added `.gitignore`
- Used hashed passwords (bcrypt)
- Protected routes with JWT middleware

---

