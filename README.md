# Student Database Management System (SDMS)

A full-stack web application for managing students, courses, enrollments, and academic grades. Built with Node.js/Express backend, MySQL database, and vanilla JavaScript frontend.

## Project Structure

```
sdms-app/
├── backend/
│   ├── routes/
│   │   ├── departments.js
│   │   ├── students.js
│   │   ├── courses.js
│   │   ├── enrollments.js
│   │   ├── grades.js
│   │   └── reports.js
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── database/
│   └── schema.sql
└── README.md
```

## Features

✅ **Dashboard** - Overview of total students, courses, departments, and enrollments
✅ **Departments Management** - Create, read, update, delete departments
✅ **Student Management** - Manage student profiles with contact details and department assignment
✅ **Course Management** - Manage courses with course codes, credits, and department assignment
✅ **Enrollment Management** - Track student enrollments in courses per semester
✅ **Grade Management** - Record and manage student grades, marks, and pass/fail status
✅ **Advanced Reports** - Generate comprehensive reports on:
   - Student grade reports
   - Course enrollment summaries
   - Failed students report
   - Course statistics (average, highest, lowest marks)
✅ **Responsive UI** - Modern, user-friendly interface with smooth animations
✅ **CRUD Operations** - Complete Create, Read, Update, Delete functionality for all entities
✅ **RESTful API** - Well-structured API endpoints for all operations

## Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Database Setup

First, ensure MySQL is running, then execute the SQL schema:

```bash
# Option 1: Using MySQL CLI
mysql -u root -p < /Users/azam/Public/sem4/dbms/sdms-app/database/schema.sql

# Option 2: Using MySQL Workbench or phpMyAdmin
# Copy and paste the contents of schema.sql and execute
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd /Users/azam/Public/sem4/dbms/sdms-app/backend
npm install
```

Configure environment variables:

```bash
# Edit .env file and update database credentials if needed
nano .env
```

Default `.env` configuration:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sdms
PORT=3000
```

**Note:** Update `DB_PASSWORD` to match your MySQL root password.

Start the backend server:

```bash
npm start
# Or use nodemon for development
npm install -g nodemon
nodemon server.js
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

Navigate to the frontend directory and open the application:

```bash
cd /Users/azam/Public/sem4/dbms/sdms-app/frontend

# Option 1: Using Python HTTP Server (Python 3)
python3 -m http.server 8000

# Option 2: Using Node.js HTTP Server
npm install -g http-server
http-server -p 8000

# Option 3: Using VS Code Live Server Extension
# Right-click on index.html and select "Open with Live Server"
```

Access the frontend at `http://localhost:8000`

## API Endpoints

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `GET /api/enrollments/:id` - Get enrollment by ID
- `POST /api/enrollments` - Create new enrollment
- `PUT /api/enrollments/:id` - Update enrollment
- `DELETE /api/enrollments/:id` - Delete enrollment

### Grades
- `GET /api/grades` - Get all grades
- `GET /api/grades/:id` - Get grade by ID
- `POST /api/grades` - Create new grade
- `PUT /api/grades/:id` - Update grade
- `DELETE /api/grades/:id` - Delete grade

### Reports
- `GET /api/reports/student-grade-report` - Student grade report
- `GET /api/reports/course-enrollment-summary` - Course enrollment summary
- `GET /api/reports/failed-students` - Failed students report
- `GET /api/reports/course-statistics` - Course statistics report

## Database Schema

### DEPARTMENT
- DepartmentID (Primary Key)
- DepartmentName
- HeadOfDepartment

### STUDENT
- StudentID (Primary Key)
- FirstName
- LastName
- Email (Unique)
- Phone
- DateOfBirth
- Address
- DepartmentID (Foreign Key)

### COURSE
- CourseID (Primary Key)
- CourseName
- CourseCode (Unique)
- Credits
- DepartmentID (Foreign Key)

### ENROLLMENT
- EnrollmentID (Primary Key)
- StudentID (Foreign Key)
- CourseID (Foreign Key)
- EnrollmentDate
- Semester
- AcademicYear

### GRADE
- GradeID (Primary Key)
- EnrollmentID (Foreign Key, Unique)
- MarksObtained
- GradeLetter
- Status (Pass/Fail)

## Usage Guide

### Adding a Student
1. Navigate to the "Students" tab
2. Fill in the student details form
3. Click "Add Student"

### Enrolling a Student in a Course
1. Navigate to the "Enrollments" tab
2. Select student and course from dropdowns
3. Enter enrollment date, semester, and academic year
4. Click "Add Enrollment"

### Recording Grades
1. Navigate to the "Grades" tab
2. Select an enrollment
3. Enter marks, grade letter, and pass/fail status
4. Click "Save Grade"

### Generating Reports
1. Navigate to the "Reports" tab
2. Click the "View Report" button for desired report
3. View the generated report data

## Sample Data

The database comes pre-populated with sample data:
- 5 Departments
- 5 Students
- 5 Courses
- 7 Enrollments
- 7 Grades

## Troubleshooting

### Connection Refused Error
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify MySQL port is 3306 (default)

### CORS Error
- Ensure backend is running on http://localhost:3000
- Check that frontend is accessing correct API_URL

### Frontend Not Loading Data
- Open browser console (F12) to check for errors
- Verify backend server is running
- Check network tab to see API responses

### Module Not Found Error
- Run `npm install` in backend directory
- Ensure all dependencies are installed

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **API Style:** RESTful
- **CORS:** Enabled for cross-origin requests

## Normalization Status

All tables are normalized up to **Third Normal Form (3NF)**:
- ✅ 1NF: All attributes contain atomic values
- ✅ 2NF: No partial dependencies
- ✅ 3NF: No transitive dependencies

## Project Submission

This project demonstrates:
- ER Diagram design
- Relational database schema
- Database normalization (3NF)
- CRUD operations
- Complex SQL queries with JOINs
- Views for data abstraction
- Full-stack web application development

## Author

DBMS Course Project - Semester 4

## License

This project is for educational purposes.
