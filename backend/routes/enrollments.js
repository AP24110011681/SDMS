const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all enrollments
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT e.*, 
             CONCAT(s.FirstName, ' ', s.LastName) AS StudentName,
             c.CourseName
      FROM ENROLLMENT e
      JOIN STUDENT s ON e.StudentID = s.StudentID
      JOIN COURSE c ON e.CourseID = c.CourseID
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET enrollment by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM ENROLLMENT WHERE EnrollmentID = ?',
      [req.params.id]
    );
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE enrollment
router.post('/', async (req, res) => {
  try {
    const { StudentID, CourseID, EnrollmentDate, Semester, AcademicYear } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO ENROLLMENT (StudentID, CourseID, EnrollmentDate, Semester, AcademicYear) VALUES (?, ?, ?, ?, ?)',
      [StudentID, CourseID, EnrollmentDate, Semester, AcademicYear]
    );
    connection.release();
    res.status(201).json({ message: 'Enrollment created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE enrollment
router.put('/:id', async (req, res) => {
  try {
    const { StudentID, CourseID, EnrollmentDate, Semester, AcademicYear } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE ENROLLMENT SET StudentID = ?, CourseID = ?, EnrollmentDate = ?, Semester = ?, AcademicYear = ? WHERE EnrollmentID = ?',
      [StudentID, CourseID, EnrollmentDate, Semester, AcademicYear, req.params.id]
    );
    connection.release();
    res.json({ message: 'Enrollment updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE enrollment
router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM ENROLLMENT WHERE EnrollmentID = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Enrollment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
