# SDMS Application Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    USER (Browser)                           │
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   FRONTEND (HTML/CSS/JavaScript)                       │ │
│  │   Port: 8000                                           │ │
│  │   ─────────────────────────────────────────────────   │ │
│  │   • index.html (UI Components)                         │ │
│  │   • styles.css (Responsive Design)                    │ │
│  │   • script.js (CRUD Operations, API Calls)            │ │
│  │   • Dashboard, Forms, Tables, Reports                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                        ↕ (AJAX/Fetch)                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   BACKEND API (Node.js + Express)                      │ │
│  │   Port: 3000                                           │ │
│  │   ─────────────────────────────────────────────────   │ │
│  │   • server.js (Express App)                            │ │
│  │   • db.js (MySQL Connection Pool)                      │ │
│  │   • Routes:                                            │ │
│  │     - /api/departments (CRUD)                          │ │
│  │     - /api/students (CRUD)                             │ │
│  │     - /api/courses (CRUD)                              │ │
│  │     - /api/enrollments (CRUD)                          │ │
│  │     - /api/grades (CRUD)                               │ │
│  │     - /api/reports (Advanced Queries)                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                        ↕ (SQL Queries)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │   DATABASE (MySQL)                                     │ │
│  │   Database: sdms                                       │ │
│  │   ─────────────────────────────────────────────────   │ │
│  │   Tables:                                              │ │
│  │   • DEPARTMENT (5 records)                             │ │
│  │   • STUDENT (5 records)                                │ │
│  │   • COURSE (5 records)                                 │ │
│  │   • ENROLLMENT (7 records)                             │ │
│  │   • GRADE (7 records)                                  │ │
│  │   Views:                                               │ │
│  │   • StudentGradeReport                                 │ │
│  │   • CourseEnrollmentSummary                            │ │
│  │   • FailedStudents                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Project Directory Structure

```
/Users/azam/Public/sem4/dbms/sdms-app/
│
├── backend/                    # Node.js/Express Backend
│   ├── routes/
│   │   ├── departments.js     # Department CRUD endpoints
│   │   ├── students.js        # Student CRUD endpoints
│   │   ├── courses.js         # Course CRUD endpoints
│   │   ├── enrollments.js     # Enrollment CRUD endpoints
│   │   ├── grades.js          # Grade CRUD endpoints
│   │   └── reports.js         # Advanced report queries
│   ├── db.js                  # MySQL connection pool
│   ├── server.js              # Express app configuration
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   └── .gitignore
│
├── frontend/                  # Vanilla JavaScript Frontend
│   ├── index.html            # Main UI with all sections
│   ├── styles.css            # Responsive styling
│   └── script.js             # CRUD operations & API calls
│
├── database/
│   └── schema.sql            # Complete database schema + sample data
│
├── README.md                 # Full documentation
├── QUICKSTART.md            # Quick setup guide
└── ARCHITECTURE.md          # This file
```

## Data Flow Diagram

### Creating a Student (Example)

```
User Form Input
      ↓
JavaScript Validation
      ↓
Fetch POST Request to /api/students
      ↓
Express Route Handler
      ↓
MySQL INSERT Query
      ↓
Database Update
      ↓
Success Response (JSON)
      ↓
Update Frontend Table
      ↓
Show Success Alert
```

### Fetching Grades (Example)

```
User Clicks "Grades" Tab
      ↓
loadGrades() Function
      ↓
Fetch GET /api/grades
      ↓
Express Route Handler
      ↓
MySQL JOIN Query (4 tables)
      ↓
Format Data with Student & Course Names
      ↓
Return JSON Array
      ↓
Populate HTML Table
      ↓
Display to User
```

## Database Relationships

```
┌──────────────────┐
│   DEPARTMENT     │
├──────────────────┤
│ DepartmentID (PK)│
│ DepartmentName   │
│ HeadOfDepartment │
└──────────────────┘
    ↑          ↑
    │1         │1
    │          │
    │    ┌─────┴────────────┐
    │    │1                 │1
  Many  STUDENT    COURSE   Many
    │    │1         │1       │
    │    └─────┬────────────┘
    │          │1
    └──────────┤
            ┌──────────────────┐
            │   ENROLLMENT     │
            ├──────────────────┤
            │ EnrollmentID (PK)│
            │ StudentID (FK)   │
            │ CourseID (FK)    │
            │ EnrollmentDate   │
            │ Semester         │
            │ AcademicYear     │
            └──────────────────┘
                    │1
                    │
                    │1
            ┌──────────────────┐
            │      GRADE       │
            ├──────────────────┤
            │ GradeID (PK)     │
            │ EnrollmentID(FK) │
            │ MarksObtained    │
            │ GradeLetter      │
            │ Status           │
            └──────────────────┘

Legend: PK = Primary Key, FK = Foreign Key
```

## API Endpoints Summary

| Resource | Method | Endpoint | Purpose |
|----------|--------|----------|---------|
| Department | GET | /api/departments | Get all departments |
| Department | POST | /api/departments | Create department |
| Department | PUT | /api/departments/:id | Update department |
| Department | DELETE | /api/departments/:id | Delete department |
| Student | GET | /api/students | Get all students |
| Student | POST | /api/students | Create student |
| Student | PUT | /api/students/:id | Update student |
| Student | DELETE | /api/students/:id | Delete student |
| Course | GET | /api/courses | Get all courses |
| Course | POST | /api/courses | Create course |
| Course | PUT | /api/courses/:id | Update course |
| Course | DELETE | /api/courses/:id | Delete course |
| Enrollment | GET | /api/enrollments | Get all enrollments |
| Enrollment | POST | /api/enrollments | Create enrollment |
| Enrollment | PUT | /api/enrollments/:id | Update enrollment |
| Enrollment | DELETE | /api/enrollments/:id | Delete enrollment |
| Grade | GET | /api/grades | Get all grades |
| Grade | POST | /api/grades | Create grade |
| Grade | PUT | /api/grades/:id | Update grade |
| Grade | DELETE | /api/grades/:id | Delete grade |
| Report | GET | /api/reports/student-grade-report | Student grades |
| Report | GET | /api/reports/course-enrollment-summary | Enrollment counts |
| Report | GET | /api/reports/failed-students | Failed students |
| Report | GET | /api/reports/course-statistics | Course stats |

## Technology Stack

```
Frontend:
  • HTML5 - Semantic markup
  • CSS3 - Responsive design with CSS Grid & Flexbox
  • Vanilla JavaScript - AJAX/Fetch API, DOM manipulation

Backend:
  • Node.js - Runtime environment
  • Express.js - Web framework & routing
  • MySQL2 - Database driver with connection pooling
  • CORS - Cross-origin resource sharing
  • Body-parser - JSON body parsing

Database:
  • MySQL - Relational database
  • 3NF - Normalized schema
  • Views - Data abstraction layer
  • Constraints - Data integrity (PK, FK, UNIQUE, NOT NULL, CHECK)
```

## Features Implemented

✅ **CRUD Operations**
  - Create departments, students, courses, enrollments, grades
  - Read and display all records with pagination support
  - Update existing records via modal forms
  - Delete records with confirmation

✅ **Data Management**
  - Student profiles with department assignment
  - Course catalog with credit system
  - Semester-based enrollments
  - Grade tracking with pass/fail status

✅ **Reporting**
  - Student grade reports with course details
  - Course enrollment summaries
  - Failed students identification
  - Course statistics (average, min, max marks)

✅ **User Interface**
  - Responsive dashboard with stats cards
  - Tabbed navigation for different modules
  - Interactive forms with validation
  - Data tables with sorting capability
  - Modal dialogs for editing
  - Toast notifications for user feedback

✅ **Data Integrity**
  - Primary keys for unique identification
  - Foreign keys for referential integrity
  - UNIQUE constraints for email and course code
  - NOT NULL constraints on required fields
  - CHECK constraints for status values

## Normalization Status

All tables conform to **Third Normal Form (3NF)**:

**1NF (First Normal Form):**
- ✅ All attributes contain atomic values
- ✅ No repeating groups
- ✅ Each row uniquely identifiable by primary key

**2NF (Second Normal Form):**
- ✅ 1NF satisfied
- ✅ No partial dependencies
- ✅ All tables use single-column primary keys

**3NF (Third Normal Form):**
- ✅ 2NF satisfied
- ✅ No transitive dependencies
- ✅ Non-key attributes depend only on primary key
- ✅ Related data stored in separate tables

## Sample Data

```
Departments: 5
├── Computer Science and Engineering (Dr. Ravi Kumar)
├── Electronics and Communication (Dr. Priya Sharma)
├── Mechanical Engineering (Dr. Anil Mehta)
├── Civil Engineering (Dr. Sunita Rao)
└── Mathematics (Dr. Anjali Gupta)

Students: 5
├── Azam Baig (CSE)
├── Priya Nair (CSE)
├── Rahul Verma (ECE)
├── Sneha Patel (CSE)
└── Kiran Reddy (Mechanical)

Courses: 5
├── CS301 - Database Management Systems (4 credits)
├── CS201 - Data Structures (4 credits)
├── EC201 - Digital Electronics (3 credits)
├── MA101 - Engineering Mathematics (4 credits)
└── CS401 - Operating Systems (4 credits)

Enrollments: 7
├── Azam enrolled in DBMS & Data Structures
├── Priya enrolled in DBMS & Mathematics
├── Rahul enrolled in Digital Electronics
├── Sneha enrolled in Mathematics
└── Kiran enrolled in Operating Systems

Grades: 7 records with marks, grades, and pass/fail status
```

## Performance Considerations

- **Connection Pooling** - MySQL2 uses connection pool for efficiency
- **Async/Await** - Non-blocking database operations
- **Lazy Loading** - Data loaded only when section is accessed
- **CORS Enabled** - Cross-origin requests handled efficiently
- **Responsive Design** - CSS Media queries for mobile/tablet
- **Client-side Validation** - Reduces server load

## Security Features

- ✅ SQL Injection Protection (Parameterized Queries)
- ✅ CORS Headers (Prevents unauthorized access)
- ✅ Input Validation (Frontend & Backend)
- ✅ Foreign Key Constraints (Data integrity)
- ✅ NOT NULL Constraints (Data validation)
- ✅ CHECK Constraints (Value validation)

## Deployment Considerations

When moving to production:
1. Use environment variables for sensitive data
2. Implement authentication & authorization
3. Add input sanitization & validation
4. Use HTTPS for secure communication
5. Implement database backups
6. Add error logging & monitoring
7. Use connection pooling (already implemented)
8. Add rate limiting for API endpoints
9. Implement request/response compression
10. Use reverse proxy (nginx) for frontend

## Future Enhancements

- User authentication & role-based access control
- Grade calculation based on marks
- Semester-wise GPA calculation
- Bulk import/export functionality
- Advanced filtering & search
- Email notifications for enrollments
- Admin dashboard with analytics
- Mobile app using React Native
- Real-time updates using WebSockets
- Audit logging for data changes
