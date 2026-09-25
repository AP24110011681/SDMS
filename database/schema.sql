-- Create SDMS Database
CREATE DATABASE IF NOT EXISTS sdms;
USE sdms;

-- DEPARTMENT Table
CREATE TABLE DEPARTMENT (
  DepartmentID      INT          PRIMARY KEY AUTO_INCREMENT,
  DepartmentName    VARCHAR(100) NOT NULL,
  HeadOfDepartment  VARCHAR(100)
);

-- STUDENT Table
CREATE TABLE STUDENT (
  StudentID    INT          PRIMARY KEY AUTO_INCREMENT,
  FirstName    VARCHAR(50)  NOT NULL,
  LastName     VARCHAR(50)  NOT NULL,
  Email        VARCHAR(100) UNIQUE NOT NULL,
  Phone        VARCHAR(15),
  DateOfBirth  DATE,
  Address      VARCHAR(200),
  DepartmentID INT,
  FOREIGN KEY (DepartmentID) REFERENCES DEPARTMENT(DepartmentID)
);

-- COURSE Table
CREATE TABLE COURSE (
  CourseID     INT         PRIMARY KEY AUTO_INCREMENT,
  CourseName   VARCHAR(100) NOT NULL,
  CourseCode   VARCHAR(20)  UNIQUE NOT NULL,
  Credits      INT          NOT NULL,
  DepartmentID INT,
  FOREIGN KEY (DepartmentID) REFERENCES DEPARTMENT(DepartmentID)
);

-- ENROLLMENT Table
CREATE TABLE ENROLLMENT (
  EnrollmentID   INT         PRIMARY KEY AUTO_INCREMENT,
  StudentID      INT         NOT NULL,
  CourseID       INT         NOT NULL,
  EnrollmentDate DATE        NOT NULL,
  Semester       VARCHAR(20),
  AcademicYear   VARCHAR(10),
  FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
  FOREIGN KEY (CourseID)  REFERENCES COURSE(CourseID)
);

-- GRADE Table
CREATE TABLE GRADE (
  GradeID        INT         PRIMARY KEY AUTO_INCREMENT,
  EnrollmentID   INT         NOT NULL UNIQUE,
  MarksObtained  DECIMAL(5,2),
  GradeLetter    CHAR(2),
  Status         VARCHAR(10)  CHECK (Status IN ('Pass', 'Fail')),
  FOREIGN KEY (EnrollmentID) REFERENCES ENROLLMENT(EnrollmentID)
);

-- Sample Data
INSERT INTO DEPARTMENT VALUES (1, 'Computer Science and Engineering', 'Dr. Ravi Kumar');
INSERT INTO DEPARTMENT VALUES (2, 'Electronics and Communication', 'Dr. Priya Sharma');
INSERT INTO DEPARTMENT VALUES (3, 'Mechanical Engineering', 'Dr. Anil Mehta');
INSERT INTO DEPARTMENT VALUES (4, 'Civil Engineering', 'Dr. Sunita Rao');
INSERT INTO DEPARTMENT VALUES (5, 'Mathematics', 'Dr. Anjali Gupta');

INSERT INTO STUDENT VALUES (1, 'Azam', 'Baig', 'azam@srmap.edu.in', '9876543210', '2005-03-15', 'Vijayawada', 1);
INSERT INTO STUDENT VALUES (2, 'Priya', 'Nair', 'priya@srmap.edu.in', '9876501234', '2005-06-20', 'Guntur', 1);
INSERT INTO STUDENT VALUES (3, 'Rahul', 'Verma', 'rahul@srmap.edu.in', '9123456789', '2004-11-05', 'Hyderabad', 2);
INSERT INTO STUDENT VALUES (4, 'Sneha', 'Patel', 'sneha@srmap.edu.in', '9234567890', '2005-01-18', 'Vijayawada', 1);
INSERT INTO STUDENT VALUES (5, 'Kiran', 'Reddy', 'kiran@srmap.edu.in', '9345678901', '2004-09-22', 'Nellore', 3);

INSERT INTO COURSE VALUES (1, 'Database Management Systems', 'CS301', 4, 1);
INSERT INTO COURSE VALUES (2, 'Data Structures', 'CS201', 4, 1);
INSERT INTO COURSE VALUES (3, 'Digital Electronics', 'EC201', 3, 2);
INSERT INTO COURSE VALUES (4, 'Engineering Mathematics', 'MA101', 4, 5);
INSERT INTO COURSE VALUES (5, 'Operating Systems', 'CS401', 4, 1);

INSERT INTO ENROLLMENT VALUES (1, 1, 1, '2025-01-10', 'Spring', '2024-25');
INSERT INTO ENROLLMENT VALUES (2, 1, 2, '2025-01-10', 'Spring', '2024-25');
INSERT INTO ENROLLMENT VALUES (3, 2, 1, '2025-01-11', 'Spring', '2024-25');
INSERT INTO ENROLLMENT VALUES (4, 3, 3, '2025-01-12', 'Spring', '2024-25');
INSERT INTO ENROLLMENT VALUES (5, 4, 4, '2025-01-13', 'Spring', '2024-25');
INSERT INTO ENROLLMENT VALUES (6, 5, 5, '2025-01-14', 'Spring', '2024-25');
INSERT INTO ENROLLMENT VALUES (7, 2, 4, '2025-01-15', 'Spring', '2024-25');

INSERT INTO GRADE VALUES (1, 1, 88.50, 'A', 'Pass');
INSERT INTO GRADE VALUES (2, 2, 75.00, 'B+', 'Pass');
INSERT INTO GRADE VALUES (3, 3, 92.00, 'A+', 'Pass');
INSERT INTO GRADE VALUES (4, 4, 55.00, 'C', 'Pass');
INSERT INTO GRADE VALUES (5, 5, 43.00, 'D', 'Fail');
INSERT INTO GRADE VALUES (6, 6, 81.00, 'A', 'Pass');
INSERT INTO GRADE VALUES (7, 7, 67.50, 'B', 'Pass');

-- Create Views
CREATE VIEW StudentGradeReport AS
SELECT S.StudentID,
       CONCAT(S.FirstName, ' ', S.LastName) AS StudentName,
       C.CourseName,
       E.Semester,
       E.AcademicYear,
       G.MarksObtained,
       G.GradeLetter,
       G.Status
FROM STUDENT S
JOIN ENROLLMENT E ON S.StudentID = E.StudentID
JOIN COURSE C ON E.CourseID = C.CourseID
JOIN GRADE G ON E.EnrollmentID = G.EnrollmentID;

CREATE VIEW CourseEnrollmentSummary AS
SELECT C.CourseName, C.CourseCode, D.DepartmentName,
       COUNT(E.EnrollmentID) AS TotalEnrollments
FROM COURSE C
JOIN ENROLLMENT E ON C.CourseID = E.CourseID
JOIN DEPARTMENT D ON C.DepartmentID = D.DepartmentID
GROUP BY C.CourseName, C.CourseCode, D.DepartmentName;

CREATE VIEW FailedStudents AS
SELECT CONCAT(S.FirstName, ' ', S.LastName) AS StudentName,
       C.CourseName,
       G.MarksObtained,
       G.GradeLetter
FROM STUDENT S
JOIN ENROLLMENT E ON S.StudentID = E.StudentID
JOIN COURSE C ON E.CourseID = C.CourseID
JOIN GRADE G ON E.EnrollmentID = G.EnrollmentID
WHERE G.Status = 'Fail';
