// Dependencies
const { readDB, saveDB} = require('./utils/utils'); // Utils to read and save db.js file
const express = require('express');
const path = require('path');
const Note = require('./lib/Note'); // Note class consructor from note.js

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3000;
// folder on server for static files
app.use(express.static('public'));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = []; // Array to store notes

// Sends notes page when GET /notes is hit
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// API which returns all notes in JSON format
app.get('/api/notes', (req, res) => {
    notes = readDB();
    res.json(notes);
});

// Saves new note into db.js when POST request is received
app.post('/api/notes', (req, res) => {
    notes = readDB();
    // Create new note using Note class
    const newNote = new Note(req.body.title, req.body.text);
    notes.push(newNote);
    if (saveDB(notes)) {
        res.status(201).json(newNote);
        console.log('Added new Note:', newNote)
    } else {
        res.status(500).send('Could not add Note'); // If file was not able to be saved return error
    }
});

// Deletes note when DELETE request is received
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    notes = readDB();
    const indexOfNote = notes.findIndex(note => note.id === id);
    if (indexOfNote !== -1) {
        console.log('Deleted Note: ', notes[indexOfNote]);
        notes.splice(indexOfNote, 1);
        saveDB(notes);
        res.sendStatus(204);
    } else {
        res.status(404).send();
    }
});

// PUT request handler - updates note with id from request with new information
app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const noteUpdate = req.body;
    notes = readDB();
    const indexOfNote = notes.findIndex(note => note.id === id);
    if (indexOfNote !== -1) {
        notes[indexOfNote].title = noteUpdate.title;
        notes[indexOfNote].text = noteUpdate.text;
        saveDB(notes);
        console.log('Updated Note: ', notes[indexOfNote]);
        res.status(200).json(notes[indexOfNote]);
    } else {
        console.log('Note is not found!')
        res.status(404).send();
    }
});

// Default route that sends the user first home page
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Starts the server to begin listening
app.listen(PORT, () => {
    console.log(`Notes Server is listening on ${PORT}`)
});
