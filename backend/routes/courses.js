const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all courses
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT c.*, d.DepartmentName 
      FROM COURSE c 
      LEFT JOIN DEPARTMENT d ON c.DepartmentID = d.DepartmentID
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET course by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM COURSE WHERE CourseID = ?',
      [req.params.id]
    );
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE course
router.post('/', async (req, res) => {
  try {
    const { CourseName, CourseCode, Credits, DepartmentID } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO COURSE (CourseName, CourseCode, Credits, DepartmentID) VALUES (?, ?, ?, ?)',
      [CourseName, CourseCode, Credits, DepartmentID]
    );
    connection.release();
    res.status(201).json({ message: 'Course created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE course
router.put('/:id', async (req, res) => {
  try {
    const { CourseName, CourseCode, Credits, DepartmentID } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE COURSE SET CourseName = ?, CourseCode = ?, Credits = ?, DepartmentID = ? WHERE CourseID = ?',
      [CourseName, CourseCode, Credits, DepartmentID, req.params.id]
    );
    connection.release();
    res.json({ message: 'Course updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE course
router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM COURSE WHERE CourseID = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
