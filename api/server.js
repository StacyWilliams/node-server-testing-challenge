const express = require('express');

const Students = require('../students/studentsModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
}); //endpoint works

server.get('/students', async (req, res) => {
  try {
    const students = await Students.getAll();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get students' });
  }
}); //endpoint works

server.delete('/students/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Students.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res.status(404).json({ message: 'Could not find a student with the given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete student' });
  }
}); //endpoint works

server.post('/students', async (req, res) => {
  const studentData = req.body;

  try {
    const student = await Students.insert(studentData);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new student' });
  }
}) //endpoint works

module.exports = server;
