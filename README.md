# LMS Lite - Learning Management System

A full-stack Learning Management System built with React.js frontend and Spring Boot backend.

## Features
- Course creation with quiz questions
- Student enrollment
- Progress tracking
- Interactive quizzes
- Responsive UI

## Tech Stack
- **Frontend:** React.js (Port 8081)
- **Backend:** Spring Boot (Port 8080)
- **Database:** H2 (In-memory)

## How to Run

### Backend
```bash
cd springapp
mvn spring-boot:run
```

### Frontend
```bash
cd reactapp
npm install
npm start
```

## Usage
1. Open http://localhost:8081
2. Navigate through Home, Courses, Add Course
3. Create courses with quiz questions
4. Enroll in courses and track progress
5. Take quizzes and view scores

## Project Structure
```
workspace/
├── reactapp/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── api.js
│   └── package.json
└── springapp/         # Spring Boot backend
    ├── src/main/java/com/examly/springapp/
    │   ├── controller/
    │   ├── model/
    │   ├── service/
    │   └── repository/
    └── pom.xml
```