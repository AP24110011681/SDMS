const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all grades
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT g.*, 
             CONCAT(s.FirstName, ' ', s.LastName) AS StudentName,
             c.CourseName
      FROM GRADE g
      JOIN ENROLLMENT e ON g.EnrollmentID = e.EnrollmentID
      JOIN STUDENT s ON e.StudentID = s.StudentID
      JOIN COURSE c ON e.CourseID = c.CourseID
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET grade by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM GRADE WHERE GradeID = ?',
      [req.params.id]
    );
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE grade
router.post('/', async (req, res) => {
  try {
    const { EnrollmentID, MarksObtained, GradeLetter, Status } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO GRADE (EnrollmentID, MarksObtained, GradeLetter, Status) VALUES (?, ?, ?, ?)',
      [EnrollmentID, MarksObtained, GradeLetter, Status]
    );
    connection.release();
    res.status(201).json({ message: 'Grade created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE grade
router.put('/:id', async (req, res) => {
  try {
    const { EnrollmentID, MarksObtained, GradeLetter, Status } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE GRADE SET EnrollmentID = ?, MarksObtained = ?, GradeLetter = ?, Status = ? WHERE GradeID = ?',
      [EnrollmentID, MarksObtained, GradeLetter, Status, req.params.id]
    );
    connection.release();
    res.json({ message: 'Grade updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE grade
router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM GRADE WHERE GradeID = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Grade deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
