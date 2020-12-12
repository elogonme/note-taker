// Dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = []; // Array to store notes

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => {
    notes = readDB();
    console.log(notes);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    notes = readDB();
    const newNote = req.body;
    console.log('new Note:', newNote)
    console.log(notes);
    res.json(notes);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => {
    console.log(`Notes Server is listening on ${PORT}`)
});

// Helper functions
const readDB = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf-8'));
}