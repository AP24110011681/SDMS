const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all departments
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM DEPARTMENT');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET department by ID
router.get('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM DEPARTMENT WHERE DepartmentID = ?', [req.params.id]);
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE department
router.post('/', async (req, res) => {
  try {
    const { DepartmentName, HeadOfDepartment } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO DEPARTMENT (DepartmentName, HeadOfDepartment) VALUES (?, ?)',
      [DepartmentName, HeadOfDepartment]
    );
    connection.release();
    res.status(201).json({ message: 'Department created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE department
router.put('/:id', async (req, res) => {
  try {
    const { DepartmentName, HeadOfDepartment } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE DEPARTMENT SET DepartmentName = ?, HeadOfDepartment = ? WHERE DepartmentID = ?',
      [DepartmentName, HeadOfDepartment, req.params.id]
    );
    connection.release();
    res.json({ message: 'Department updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE department
router.delete('/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM DEPARTMENT WHERE DepartmentID = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Department deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
