const express = require('express');
const router = express.Router();
const pool = require('../db');

// Report: Student Grade Report
router.get('/student-grade-report', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
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
      JOIN GRADE G ON E.EnrollmentID = G.EnrollmentID
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Report: Course Enrollment Summary
router.get('/course-enrollment-summary', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT C.CourseName, C.CourseCode, D.DepartmentName,
             COUNT(E.EnrollmentID) AS TotalEnrollments
      FROM COURSE C
      JOIN ENROLLMENT E ON C.CourseID = E.CourseID
      JOIN DEPARTMENT D ON C.DepartmentID = D.DepartmentID
      GROUP BY C.CourseName, C.CourseCode, D.DepartmentName
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Report: Failed Students
router.get('/failed-students', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT CONCAT(S.FirstName, ' ', S.LastName) AS StudentName,
             C.CourseName,
             G.MarksObtained,
             G.GradeLetter
      FROM STUDENT S
      JOIN ENROLLMENT E ON S.StudentID = E.StudentID
      JOIN COURSE C ON E.CourseID = C.CourseID
      JOIN GRADE G ON E.EnrollmentID = G.EnrollmentID
      WHERE G.Status = 'Fail'
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Report: Average marks per course
router.get('/course-statistics', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT C.CourseName,
             COUNT(G.GradeID) AS TotalStudents,
             AVG(G.MarksObtained) AS AverageMarks,
             MAX(G.MarksObtained) AS HighestMarks,
             MIN(G.MarksObtained) AS LowestMarks
      FROM COURSE C
      JOIN ENROLLMENT E ON C.CourseID = E.CourseID
      JOIN GRADE G ON E.EnrollmentID = G.EnrollmentID
      GROUP BY C.CourseName
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
