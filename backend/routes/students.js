const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all students
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT s.*, d.DepartmentName 
      FROM STUDENT s 
      LEFT JOIN DEPARTMENT d ON s.DepartmentID = d.DepartmentID
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET student by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM STUDENT WHERE StudentID = ?',
      [req.params.id]
    );
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE student
router.post('/', async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, DateOfBirth, Address, DepartmentID } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO STUDENT (FirstName, LastName, Email, Phone, DateOfBirth, Address, DepartmentID) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [FirstName, LastName, Email, Phone, DateOfBirth, Address, DepartmentID]
    );
    connection.release();
    res.status(201).json({ message: 'Student created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE student
router.put('/:id', async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, DateOfBirth, Address, DepartmentID } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE STUDENT SET FirstName = ?, LastName = ?, Email = ?, Phone = ?, DateOfBirth = ?, Address = ?, DepartmentID = ? WHERE StudentID = ?',
      [FirstName, LastName, Email, Phone, DateOfBirth, Address, DepartmentID, req.params.id]
    );
    connection.release();
    res.json({ message: 'Student updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM STUDENT WHERE StudentID = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
